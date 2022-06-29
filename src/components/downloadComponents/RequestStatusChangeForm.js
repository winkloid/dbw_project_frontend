import { useState } from "react";
import axios from "axios";

import SendingRequestFailed from "./SendingRequestFailed";

export default function RequestStatusChangeForm(props) {
    const [requestMessage, setRequestMessage] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [sendingRequestFailed, setSendingRequestFailed] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    let defaultRequestMessage = (props.blockFile) ? "Die Datei sollte gesperrt werden, weil..." : "Die Datei sollte entsperrt werden, weil...";

    const handleRequestMessageChange = (changingEvent) => {
        setRequestMessage(changingEvent.target.value);
    }

    const handleMessageSubmission = async () => {
        setSendingRequest(true);
        let response = await axios({
            method: "post",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/requestBlockingStatusChange/" + props.fileId,
            data: new URLSearchParams({
                "requestMessage": requestMessage,
                "blockFile": props.blockFile ? "true" : "false",
            })
        }).then((requestSubmissionResponse) => {
            setRequestSent(true);
            setSendingRequestFailed(false);
            setSendingRequest(false);
            return requestSubmissionResponse;
        }).catch((error) => {
            setSendingRequestFailed(true);
            setSendingRequest(false);
            return error.response;
        });
        setSendingRequest(false);
    }

    if (props.isExpanded && !requestSent) {
        return (
            <div class="row">
            <div className="card bg-light col m-2">
                <div className="card-body">
                    <h3 className="card-title">{props.blockFile ? "Sperrung" : "Entsperrung"} beantragen</h3>
                    <p className="card-text">Bitte beschreiben Sie im folgenden Textfeld kurz, warum die Datei {props.blockFile ? "gesperrt" : "entsperrt"} werden sollte.</p>
                    <div className="row form-floating">
                        <textarea class-name="form-control" onChange={handleRequestMessageChange} placeholder={defaultRequestMessage} value={requestMessage} />
                    </div>
                    <br />
                    <button className={sendingRequest ? "btn bg-secondary text-gray" : "btn bg-danger text-white"} disabled={sendingRequest} onClick={handleMessageSubmission}>Anfrage absenden</button>
                </div>
            </div>
            <SendingRequestFailed sendingFailed={sendingRequestFailed} />
            </div>
        );
    } else if (requestSent && props.isExpanded) {
        return (
            <div className="row">
            <div className="card bg-light col m-2">
            <div className="card-body">
                <h3 className="card-title">{props.blockFile ? "Sperrung" : "Entsperrung"} beantragen</h3>
                <p className="text-success">Ihre Anfrage wurde gesendet. Ein Administrator wird sie bearbeiten.</p>
            </div>
            </div>
            </div>
        );
    } else return;
}