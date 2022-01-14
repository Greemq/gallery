<?php

namespace App\Http\Controllers;

use App\Events\StartVideoChat;
use App\Models\Agora\RtcTokenBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AgoraController extends Controller
{
    public function callUser(Request $request){
        $data['userToCall']=$request->user_to_call;
        $data['signalData']=$request->signal_data;
        $data['from']=Auth::id();
        $data['type']='incomingCall';

        broadcast(new StartVideoChat($data))->toOthers();

    }

    public function acceptCall(Request $request){
        $data['signal'] = $request->signal;
        $data['to'] = $request->to;
        $data['type'] = 'callAccepted';
        broadcast(new StartVideoChat($data))->toOthers();
        
    }

    public function createToken($room,$uid,$role){
        $appID = "b0e7072ea1f8479fb58b857449c7f702";
        $appCertificate = "887114e4cf254167807d5a622f42316c";
        $channelName = $room;
        $expireTimeInSeconds = 3600;
        $currentTimestamp = (new \DateTime("now", new \DateTimeZone('UTC')))->getTimestamp();
        $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

        $token = RtcTokenBuilder::buildTokenWithUid($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs);
        return $token . PHP_EOL;
    }
}
