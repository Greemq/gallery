<template>
    <div>
        <template v-if="stream">
            <div>
                <p>App id : <input id="app-id" v-model="agoraAppId" type="text" value=""/></p>
                <input v-model="agoraToken" placeholder="agoratoken" type="text"/>
                <input v-model="roomName" placeholder="roomname" type="text"/>
                <h2>{{ uid }}</h2>

            </div>
            <div>
                <input id="RoleAttendee" v-model="role" type="radio" value="0">
                <label for="one">RoleAttendee</label>
                <br>
                <input id="RolePublisher" v-model="role" type="radio" value="1">
                <label for="two">RolePublisher</label>
                <br>
                <input id="RoleSubscriber" v-model="role" type="radio" value="2">
                <label for="two">RoleSubscriber</label>
                <br>
                <input id="RoleAdmin" v-model="role" type="radio" value="101">
                <label for="two">RoleAdmin</label>
                <br>
                <span>Выбрано: {{ role }}</span>

            </div>
            <button @click="createClient">create channel</button>
            <button @click="getRtcToken">create token</button>
            <button @click="joinChannel">join token</button>

            <div id="video_stream" style="width: 500px;height: 500px;background-color: #0c5460"></div>
            <h4>My Feed :</h4>
            <div id="me"></div>
            <h4>Remote Feeds :</h4>
            <div id="remote-container">

            </div>
        </template>
        <template v-else>

        </template>
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
            agoraAppId: 'b0e7072ea1f8479fb58b857449c7f702',
            // agoraAppId: 'ff487d0a29264aa78133c3ea7eccd374',
            // agoraToken: '006b0e7072ea1f8479fb58b857449c7f702IABDNBiS2X1uKzalH+u03t7KfyyWZDGEbRJcQQ/ZbcB8cHbzGBgAAAAAEABLPQ3JgpHhYQEAAQCBkeFh',
            agoraToken: null,
            uid: null,
            remoteContainer: null,
            role: 101,
            stream: false
        };
    },
    mounted() {
        this.uid = Math.round(Math.random(1000) * 1000000);
        this.client = AgoraRTC.createClient({
            mode: 'rtc',
            codec: 'vp8'
        });
        console.log('mounted');
        // this.client.init(this.agoraAppId, () => {
        //     console.log('client init');
        // }, (err) => {
        //     this.handleFail(err);
        // });
        //
        // this.client.join(null,);
    },
    methods: {
        liveStream() {
            this.client.init(this.agoraAppId);
            this.client.setClientRole(this.role);
            this.client.join(this.agoraToken, this.roomName, this.uid);
        },
        createClient() {
            this.createChannel();
        },
        createChannel() {
            let appid = document.getElementById("app-id").value;
            this.client.setClientRole('host');
            this.client.init(appid, () => console.log('client initialized'), (err) => this.handleFail(err));
            this.client.join(this.agoraToken, this.roomName, this.uid, (uid) => {
                // navigator.mediaDevices.getUserMedia(
                //     {video: true, audio: true}
                // ).then(function(mediaStream){
                //     let videoSource = mediaStream.getVideoTracks()[0];
                //     let audioSource = mediaStream.getAudioTracks()[0];
                //     // After processing videoSource and audioSource
                //     let localStream = AgoraRTC.createStream({
                //         video: true,
                //         audio: true,
                //         videoSource: videoSource,
                //         audioSource: audioSource
                //     });
                //     localStream.init(() => {
                //         localStream.play('me');
                //         this.client.publish(localStream);
                //     });
                // });
                let localStream = AgoraRTC.createStream({
                    video: true,
                    audio: true,
                });
                localStream.init(() => {
                    localStream.play('me');
                    this.client.publish(localStream);
                });
                console.log('appId: ' + appid + '\nchannel id: ' + this.roomName + '\nuser id: ' + uid);
            }, (err) => this.handleFail(err));
            this.client.on('stream-subscribed', function (evt) {
                let stream = evt.stream;
                this.addVideoStream(stream.getId());
                stream.play(stream.getId());
            });

            this.client.on('stream-added', (evt) => {
                this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            });

            // this.client.on('stream-removed', this.removeVideoSteam(this.client.stream));
            // this.client.on('peer-leave', this.removeVideoSteam(this.client.stream));

        },
        getRtcToken() {
            request.get('/api/createRtcToken/' + this.roomName + '/' + this.uid + '/' + this.role, {}
            ).then(res => {
                this.agoraToken = res.data;
                console.log(res);
            });
        },
        joinChannel() {
            this.client = AgoraRTC.createClient({
                mode: 'rtc',
                codec: 'vp8'
            });
            this.client.setClientRole('audience');
            this.client.join(this.agoraToken, this.roomName, this.uid, (uid) => {
                // navigator.mediaDevices.getUserMedia(
                //     {video: true, audio: true}
                // ).then(function(mediaStream){
                //     let videoSource = mediaStream.getVideoTracks()[0];
                //     let audioSource = mediaStream.getAudioTracks()[0];
                //     // After processing videoSource and audioSource
                //     let localStream = AgoraRTC.createStream({
                //         video: true,
                //         audio: true,
                //         videoSource: videoSource,
                //         audioSource: audioSource
                //     });
                //     localStream.init(() => {
                //         localStream.play('me');
                //         this.client.publish(localStream);
                //     });
                // });
                let localStream = AgoraRTC.createStream({
                    video: true,
                    audio: true,
                });
                localStream.init(() => {
                    localStream.play('me');
                    this.client.publish(localStream);
                });
                console.log('appId: ' + appid + '\nchannel id: ' + this.roomName + '\nuser id: ' + uid);
            }, (err) => this.handleFail(err));
        },


        handleFail(err) {
            console.log("Error : ", err);
        },
        addVideoStream(streamId) {
            let remoteContainer = document.getElementById('remote-container');
            let streamDiv = document.createElement('div');
            streamDiv.id = streamId;
            streamDiv.style.transform = "rotateY(180deg)";
            remoteContainer.appendChild(streamDiv);
        },
        removeVideoSteam(evt) {
            let stream = evt.stream;
            stream.stop();
            let remDiv = document.getElementById(stream.getId());
            remDiv.parentNode.removeChild(remDiv);
            console.log('Stream removed' + stream.getId());

        },
    }
};
</script>

<style scoped>

</style>