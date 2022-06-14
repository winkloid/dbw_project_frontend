import { useState } from "react";
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
        if (byteSize < 1024) {
            return byteSize.toString() + " B";
        } else if (byteSize >= 1024 && byteSize < 1048576) {
            return (Math.round((byteSize / 1024) * 100) / 100).toString() + " kiB";
        } else {
            return (Math.round((byteSize / 1048576) * 100) / 100).toString() + " MiB";
        }
    }

    if (!isSent) {
        return (
            <div>
                <h1>Details zur Anfrage mit der Anfrage-ID: {props.entry._id}</h1>
                <div className="container">
                    <div className="card">
                        <h2 className={props.entry.blockFile ? "card-header bg-danger text-white" : "card-header bg-success text-white"}>Informationen zur {props.entry.blockFile ? "Blocking" : "Unblocking"}-Anfrage</h2>
                        <div className="table-responsive">
                            <table className="card-body table table-striped-columns">
                                <tbody>
                                    <tr>
                                        <th className="col-3">Anfrage auf: </th>
                                        <th>{props.entry.blockFile ? "Sperrung" : "Entsperrung"}</th>
                                    </tr>
                                    <tr>
                                        <th className="col-3">Angefügte Nachricht: </th>
                                        <td className="fst-italic">{props.entry.requestMessage}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br />
                    <div className="card">
                        <h2 className="card-header bg-primary text-white">Informationen zur betroffenen Datei</h2>
                        <div className="table-responsive">
                        <table className="card-body table table-striped-columns">
                            <tbody>
                                <tr>
                                    <th className="col-3">Dateiname: </th>
                                    <td>{decodeURI(escape(props.entry.fileName))}</td>
                                </tr>
                                <tr>
                                    <th className="col-3">Dateigröße: </th>
                                    <td>{humanReadableSize(props.entry.fileSize)}</td>
                                </tr>
                                <tr>
                                    <th className="col-3">Hochladedatum: </th>
                                    <td>{(new Date(props.entry.uploadDate)).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <th className="col-3">Hochladezeit: </th>
                                    <td>{(new Date(props.entry.uploadDate)).toLocaleTimeString()}</td>
                                </tr>
                                <tr>
                                    <th className="col-3">Datei-ID: </th>
                                    <td>{props.entry.fileId}</td>
                                </tr>
                                <tr>
                                    <th className="col-3">SHA256-Hash: </th>
                                    <td>{props.entry.sha256Hash}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <br />
                    <div className="card">
                        <h2 className="card-header bg-light">Optionen</h2>
                        <div className="card-body">
                            <div className="container-fluid">
                            <div className="row">
                            <div className="card bg-success text-white col-md col-12 m-2">
                                <h3 className="card-header">Anfrage annehmen</h3>
                                <div className="card-body">
                                    <p className="card-text">Wenn Sie eine Anfrage annehmen, wird der Blockierungs-Status der Datei entsprechend geändert, diese Anfrage und auch alle weiteren Anfragen zu Dateien mit diesem SHA256-Hash aus dem System gelöscht.</p>
                                    <button className="btn btn-primary col-12" onClick={acceptRequest}>Anfrage annehmen</button>
                                </div>
                            </div>
                            <div className="card bg-warning col-md col-12 m-2">
                                <h3 className="card-header">Anfrage ablehnen</h3>
                                <div className="card-body">
                                    <p className="card-text">Wenn Sie die Anfrage ablehnen, wird der Blockierungs-Status der Datei nicht verändert. Die abgelehnte Anfrage wird zudem aus dem System gelöscht.</p>
                                    <button className="btn btn-danger col-12" onClick={declineRequest}>Anfrage ablehnen</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <SendingStatusChangeFailed hasFailed={sendingFailed} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Änderung erfolgreich!</h1>
                <a href={process.env.REACT_APP_FRONTEND_BASE_URL + "/administrator"}>Zurück zur Übersicht</a>
            </div>
        );
    }
}