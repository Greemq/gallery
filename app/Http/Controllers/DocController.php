<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DocController extends Controller
{
    public function createDoc($res, $year)
    {

        $arr = [];
        foreach ($res->groupBy('name') as $value) {
            foreach ($value as $item) {
                array_push($arr, [
                    'name' => $item->name,
                    'count' => $item->count,
                    'price' => $item->price,
                    'type' => $item->type,
                    'summ' => $item->summ,
                    'date' => $item->date,
                    'exchange_data' => $item->exchange_data,
                    'income' => $item->income,
                    'income_t' => $item->income_t,
                    'loss' => $item->loss,
                ]);
            }
        }

        $styleArray = [
            'borders' => [
                'outline' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
                'inside' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['rgb' => '919191'],
                ],
            ]
        ];
        $buyStyle = [
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'rotation' => 90,
                'startColor' => [
                    'rgb' => 'c2c2c2',
                ],
            ],
        ];

        $sheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $worksheet = $sheet->getActiveSheet();
        $worksheet->getPageMargins()->setTop(0.3);
        $worksheet->getPageMargins()->setRight(0.3);
        $worksheet->getPageMargins()->setLeft(0.3);
        $worksheet->getPageMargins()->setBottom(0.3);
        $worksheet->fromArray(['Тикер', 'Кол-во', 'Цена', 'Тип', 'Сумма', 'Дата', 'Курс', 'Прибыль $', 'Прибыль Т', 'Убыток'], null, 'A1', true);
        $worksheet->getStyle('A1:J1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('919191');
        $worksheet->getStyle('A1:J1')->getFont()->setBold(true);
        $worksheet->fromArray($arr, null, 'A2', true);
//        $worksheet->setCellValueExplicit('H'.($res->count()+2),'=SUM(H2:H'.($res->count()+1).')',\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
//        $worksheet->setCellValueExplicit('H'.($res->count()+2),'=SUM(H2:H'.($res->count()+1).')',\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
//        $worksheet->setCellValueExplicit('I'.($res->count()+2),'=SUM(I2:I'.($res->count()+1).')',\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
        $worksheet->setCellValue('H' . ($res->count() + 2), '=SUM(H2:H' . ($res->count() + 1) . ')');
        $worksheet->setCellValue('I' . ($res->count() + 2), '=SUM(I2:I' . ($res->count() + 1) . ')');
        $worksheet->setCellValue('A' . ($res->count() + 2), 'Прибыль');
        $worksheet->setCellValue('I' . ($res->count() + 3), '=(I' . ($res->count() + 2) . '*0.1)');
        $worksheet->setCellValue('A' . ($res->count() + 3), 'Налог');
        $worksheet->getColumnDimension('A')->setWidth(10);
        $worksheet->getColumnDimension('B')->setWidth(7);
        $worksheet->getColumnDimension('C')->setWidth(7);
        $worksheet->getColumnDimension('D')->setWidth(5);
        $worksheet->getColumnDimension('E')->setWidth(9);
        $worksheet->getColumnDimension('F')->setWidth(10);
        $worksheet->getColumnDimension('G')->setWidth(7);
        $worksheet->getColumnDimension('H')->setWidth(9);
        $worksheet->getColumnDimension('I')->setWidth(11);
        $worksheet->getColumnDimension('J')->setWidth(9);
        $worksheet->getStyle('A1:J' . ($res->count() + 1))->applyFromArray($styleArray);
        for ($i = 2; $i < $res->count() + 1; $i++) {
            if ($worksheet->getCell('D' . $i)->getValue() == 'S') {
                $worksheet->getStyle('A' . $i . ':J' . $i)->applyFromArray($buyStyle);
            }
        }
        $worksheet->getPageSetup()->setRowsToRepeatAtTopByStartAndEnd(1, 1);
        $worksheet->getStyle('D')->getAlignment()->setHorizontal('center');
        $worksheet->getStyle('D')->getFont()->setBold(true);
        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($sheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_contents();
        ob_end_clean();
        $hash = md5(time() . rand(1111, 9999));
        $hash = \Carbon\Carbon::now()->format('d_m_Y_') . $hash;
        \Illuminate\Support\Facades\Storage::disk('files')->put($year . "__" . $hash . ".xlsx", $content);

    }
}
