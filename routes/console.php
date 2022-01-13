<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');


Artisan::command('data_work', function () {
    $exchange = \Illuminate\Support\Facades\Storage::path('public/exchange.xlsx');
//    $data = \Illuminate\Support\Facades\Storage::path('public/downloaded.xlsx');

//    $exchange = \Illuminate\Support\Facades\Storage::path('public/exchange2019-2020.xlsx');
//    $data = \Illuminate\Support\Facades\Storage::path('public/book2019-2020.xlsx');
    $data = \Illuminate\Support\Facades\Storage::path('public/newFile.xlsx');


    $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($exchange);
    $tmp = $spreadsheet->getActiveSheet()->rangeToArray('A2:C1839', null, false, false, false);
    $exchange_data = [];
    foreach ($tmp as $cell) {
        $q = new stdClass();
        $q->date = $cell[0];
        $q->price = $cell[2];
        array_push($exchange_data, $q);
    }
    $exchange_data = collect($exchange_data);

    $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($data);

    //ALL RECORDS
    $tmp = $spreadsheet->getActiveSheet()->rangeToArray('A1:K958', null, false, false, false);
//    $tmp = $spreadsheet->getActiveSheet()->rangeToArray('A98:K452', null, false, false, false);
//    $work_data = [];
    $cell_names = [
        'name' => 0,
        'type' => 1,
        'price' => 2,
        'amount' => 3,
        'date' => 10,
    ];
    $res = new \Illuminate\Database\Eloquent\Collection();
    foreach ($tmp as $cell) {
        $e = $exchange_data->first(function ($i) use ($q) {
            return $i->date == \Carbon\Carbon::parse($q->date)->subDay()->format('d.m.Y');
        });
        $q = new \App\Models\Stock();
        $q->name = $cell[$cell_names['name']];
        $q->amount = abs($cell[$cell_names['amount']]);
        $q->count = abs($cell[$cell_names['amount']]);
        $q->type = $cell[$cell_names['type']] == 'Продажа' ? 'S' : 'B';
        $q->price = $cell[$cell_names['price']];
        $q->summ = abs($cell[$cell_names['amount']] * $cell[$cell_names['price']]);
        $q->date = \Carbon\Carbon::parse($cell[$cell_names['date']])->format('d.m.Y H:i:s');
        $q->exchange_data = isset($e) ? $e->price : 0;
        $q->income = 0;
        $q->income_t = 0;
        $q->loss = 0;
        $res->push($q);
    }



    foreach ($res->groupBy('name') as $value) {

        if (count($value) != 1) {
            $sell = $value->filter(function ($q) {
                return $q->type == "S";
            })->reverse()->values();
            $buy = $value->filter(function ($q) {
                return $q->type == "B";
            })->reverse()->values();
            foreach ($sell as $item) {


                $amount = $item->count;
                while ($amount != 0) {
                    $b = $buy->where('amount', '>', '0')
                        ->filter(function ($q) use ($item) {
                            return \Carbon\Carbon::parse($q->date)->lessThanOrEqualTo(\Carbon\Carbon::parse($item->date))==true;
                        })
                        ->first();

                    $spent = 0;
                    if (empty($b))
                        break;

                    if ($amount > $b->amount || $amount == $b->amount) {
                        $spent = $b->amount;
                        $amount -= $b->amount;
                        $b->amount = 0;
                    } else {
                        $spent = $amount;
                        $b->amount -= $amount;
                        $amount = 0;
                    }

                    $result = ($item->price - $b->price) * $spent;
                    if ($result > 0) {
                        $item->income += round($result, 2);
                        $item->income_t = round($item->exchange_data * $result,2);
                    } else
                        $item->loss = round($result, 2);
                }

            }

        }

//        break;
    }
    $years = [2019,2020,2021];
//    $years = [2020];
    foreach ($years as $year){
        $tmp = $res->filter(function($q) use ($year){
            return \Carbon\Carbon::parse($q->date)->year == $year;
        });
        app("App\Http\Controllers\DocController")->createDoc($tmp,$year);
    }


//    $sheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
//    $worksheet = $sheet->getActiveSheet();
//    $arr = [];
//    foreach ($res->groupBy('name') as $value) {
//        foreach ($value as $item) {
//            array_push($arr, [
//                'name' => $item->name,
//                'count' => $item->count,
//                'price' => $item->price,
//                'type' => $item->type,
//                'summ' => $item->summ,
//                'date' => $item->date,
//                'exchange_data' => $item->exchange_data,
//                'income' => $item->income,
//                'income_t' => $item->income_t,
//                'loss' => $item->loss,
//            ]);
//        }
//    }
//    $worksheet->fromArray($arr, null, 'A1', true);
//    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($sheet);
//    ob_start();
//    $writer->save('php://output');
//    $content = ob_get_contents();
//    ob_end_clean();
//    $hash = md5(time() . rand(1111, 9999));
//    $hash = \Carbon\Carbon::now()->format('d_m_Y_') . $hash;
//    \Illuminate\Support\Facades\Storage::disk('files')->put($hash . ".xlsx", $content);
});