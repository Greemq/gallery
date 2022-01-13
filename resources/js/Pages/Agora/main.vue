<template>
    <div>
        <div>
            <p>App id : <input id="app-id" type="text" value="" v-model="agoraAppId"/></p>
            <input v-model="agoraToken" placeholder="agoratoken" type="text"/>
            <input v-model="roomName" placeholder="roomname" type="text"/>
            <h2>{{uid}}</h2>
        </div>
        <button @click="createClient">create channel</button>
        <button @click="getRtcToken">create token</button>
        <div id="video_stream" style="width: 500px;height: 500px;background-color: #0c5460"></div>
        <h4>My Feed :</h4>
        <div id="me"></div>
        <h4>Remote Feeds :</h4>
        <div id="remote-container">

        </div>
    </div>
</template>

<script>
import AgoraRTC from 'agora-rtc-sdk';
import request from "../../Helpers/api";

export default {
    name: "mainAgora",
    data() {
        return {
            client: null,
            roomName: null,
            // agoraAppId: 'b0e7072ea1f8479fb58b857449c7f702',
            agoraAppId: 'ff487d0a29264aa78133c3ea7eccd374',
            // agoraToken: null,
            // agoraToken: '006b0e7072ea1f8479fb58b857449c7f702IABDNBiS2X1uKzalH+u03t7KfyyWZDGEbRJcQQ/ZbcB8cHbzGBgAAAAAEABLPQ3JgpHhYQEAAQCBkeFh',
            agoraToken: null,
            uid: null,
            remoteContainer: null
        };
    },
    mounted() {
        this.uid = Math.round(Math.random(1000)*1000000)

        // this.client.init(this.agoraAppId, () => {
        //     console.log('client init');
        // }, (err) => {
        //     this.handleFail(err);
        // });
        //
        // this.client.join(null,);
    },
    methods: {
        createClient(){
            this.remoteContainer = document.getElementById('remote-container');

            this.client = AgoraRTC.createClient({
                mode: 'rtc',
                codec: 'vp8'
            });
            this.createChannel()
        },
        createChannel() {
            let appid = document.getElementById("app-id").value;
            this.client.init(appid, () => console.log('client initialized'), (err) => this.handleFail(err));
            this.client.join(this.agoraToken, this.roomName, this.uid, (uid) => {
                let localStream = AgoraRTC.createStream({
                    video: true,
                    audio: true
                });
                localStream.init(() => {
                    localStream.play('me');
                    this.client.publish(localStream);
                });
                console.log('appId: ' + appid + '\nchannel id: ' + this.roomName + '\nuser id: ' + uid);
            }, (err) => this.handleFail(err));
            this.client.on('stream-added', (evt) => {
                this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            });
            this.client.on('stream-subscribed', function (evt) {
                let stream = evt.stream;
                this.addVideoStream(stream.getId());
                stream.play(stream.getId());
            });
            // this.client.on('stream-removed', this.removeVideoSteam(this.client.stream));
            // this.client.on('peer-leave', this.removeVideoSteam(this.client.stream));

        },
        getRtcToken() {
            request.get('/api/createRtcToken/' + this.roomName + '/' + this.uid, {}
            ).then(res => {
                this.agoraToken = res.data;
                console.log(res);
            });
        },


        handleFail(err) {
            console.log("Error : ", err);
        },
        addVideoStream(streamId) {
            let streamDiv = document.createElement('div');
            streamDiv.id = streamId;
            streamDiv.style.transform = "rotateY(180deg)";
            this.remoteContainer.appendChild(streamDiv);
        },
        removeVideoSteam(evt) {
            let stream = evt.stream;
            stream.stop();
            let remDiv = document.getElementById(stream.getId());
            remDiv.parentNode.removeChild(remDiv);
            console.log('Stream removed' + stream.getId());

        }
    }
};
</script>

<style scoped>

</style>