import {useState} from "react";
import axios from "axios";

import SendingStatusChangeFailed from "./SendingStatusChangeFailed";

export default function StatusChangeRequestInformation(props) {
    const [isSent, setIsSent] = useState(false);
    const [sendingFailed, setSendingFailed] = useState(false);

    const acceptRequest = async () => {
        let acceptRequestResponse = await axios({
            method: "delete",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/acceptBlockingStatusChangeRequest/" + props.entry._id,
        }).then((response) => {
            setIsSent(true);
            setSendingFailed(false);
            return response;
        }).catch((error) => {
            setIsSent(false);
            setSendingFailed(true);
            return error.response;
        });
    }

    const declineRequest = async () => {
        let declineRequestResponse = await axios({
            method: "delete",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/declineBlockingStatusChangeRequest/" + props.entry._id,
        }).then((response) => {
            setIsSent(true);
            setSendingFailed(false);
            return response;
        }).catch((error) => {
            setIsSent(false);
            setSendingFailed(true);
            return error.response;
        });
    }
    
    const humanReadableSize = (byteSize) => {
        if(byteSize < 1024) {
            return byteSize.toString() + " B";
        } else if (byteSize >= 1024 && byteSize < 1048576) {
            return (Math.round((byteSize / 1024) * 100) / 100).toString() + " kiB";
        } else {
            return (Math.round((byteSize / 1048576) * 100) / 100).toString() + " MiB";
        }
    }

    if(!isSent) {
        return(
        <div>
            <h1>Details zur Anfrage mit der Anfrage-ID: {props.entry._id}</h1>
            <div>
                <h2>Informationen zur Blocking/Unblocking-Anfrage:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Anfrage auf: </td>
                            <td>{props.entry.blockFile ? "Sperrung" : "Entsperrung"}</td>
                        </tr>
                        <tr>
                            <td>Angefügte Nachricht: </td>
                            <td>{props.entry.requestMessage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Informationen zur betroffenen Datei:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Dateiname: </td>
                            <td>{decodeURI(escape(props.entry.fileName))}</td>
                        </tr>
                        <tr>
                            <td>Dateigröße: </td>
                            <td>{humanReadableSize(props.entry.fileSize)}</td>
                        </tr>
                        <tr>
                            <td>Hochladedatum: </td>
                            <td>{(new Date(props.entry.uploadDate)).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Hochladezeit: </td>
                            <td>{(new Date(props.entry.uploadDate)).toLocaleTimeString()}</td>
                        </tr>
                        <tr>
                            <td>Datei-ID: </td>
                            <td>{props.entry.fileId}</td>
                        </tr>
                        <tr>
                            <td>SHA256-Hash: </td>
                            <td>{props.entry.sha256Hash}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Optionen:</h2>
                <p><strong>Info: </strong>Wenn Sie eine Anfrage annehmen, werden auch alle anderen Anfragen zu Dateien mit diesem SHA256-Hash aus dem System gelöscht.</p>
                <button onClick={acceptRequest}>Anfrage annehmen</button>
                <button onClick={declineRequest}>Anfrage ablehnen</button>
            </div>
            <SendingStatusChangeFailed hasFailed={sendingFailed} />
        </div>
        );
    } else {
        return(
        <div>
            <h1>Änderung erfolgreich!</h1>
            <a href={process.env.REACT_APP_FRONTEND_BASE_URL + "/administrator"}>Zurück zur Übersicht</a>
        </div>
        );
    }
}