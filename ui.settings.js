// edit by ALEXANDER ERIC@ERIC LAPIN

var settingsPanel = getElement('.settings-panel');
getElement('#settings').onclick = function() {
    settingsPanel.style.display = 'block';
};

getElement('#save-settings').onclick = function() {
    settingsPanel.style.display = 'none';

    if (!!getElement('#autoTranslateText').checked) {
        rtcMultiConnection.autoTranslateText = true;
        rtcMultiConnection.language = getElement('#language').value;
    } else rtcMultiConnection.autoTranslateText = false;

    rtcMultiConnection.bandwidth.audio = getElement('#audio-bandwidth').value;
    rtcMultiConnection.bandwidth.video = getElement('#video-bandwidth').value;

    rtcMultiConnection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: !!getElement('#OfferToReceiveAudio').checked,
        OfferToReceiveVideo: !!getElement('#OfferToReceiveVideo').checked,
        IceRestart: !!getElement('#IceRestart').checked
    };

    var videWidth = getElement('#video-width').value;
    var videHeight = getElement('#video-height').value;
    rtcMultiConnection.mediaConstraints.mandatory = {
        minWidth: videWidth,
        maxWidth: videWidth,
        minHeight: videHeight,
        maxHeight: videHeight
    };

    rtcMultiConnection.preferSCTP = !!getElement('#prefer-sctp').checked;
    rtcMultiConnection.chunkSize = +getElement('#chunk-size').value;
    rtcMultiConnection.chunkInterval = +getElement('#chunk-interval').value;

    window.skipRTCMultiConnectionLogs = !!getElement('#skip-RTCMultiConnection-Logs').checked;

    rtcMultiConnection.maxParticipantsAllowed = getElement('#max-participants-allowed').value;
    rtcMultiConnection.candidates = {
        relay: getElement('#prefer-stun').checked,
        reflexive: getElement('#prefer-turn').checked,
        host: getElement('#prefer-host').checked
    };

    rtcMultiConnection.dataChannelDict = eval('(' + getElement('#dataChannelDict').value + ')');

    if (!!getElement('#fake-pee-connection').checked) {

        rtcMultiConnection.fakeDataChannels = true;
        rtcMultiConnection.session = { };
    }
    ;
};

var audioDeviecs = getElement('#audio-devices');
var videoDeviecs = getElement('#video-devices');

rtcMultiConnection.getDevices(function(devices) {
    for (var device in devices) {
        device = devices[device];
        appendDevice(device);
    }
});

function appendDevice(device) {
    var option = document.createElement('option');
    option.value = device.id;
    option.innerHTML = device.label || device.id;
    if (device.kind == 'audio') {
        audioDeviecs.appendChild(option);
    } else videoDeviecs.appendChild(option);
}
