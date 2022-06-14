export default function SendingStatusChangeFailed(props) {
    if(props.hasFailed) {
        return(
            <div className="card bg-danger">
                <div className="card-header">
                    <h1 className="text-white">Fehler beim Senden des Änderungsauftrages</h1>
                </div>
                <div className="card-body">
                    <p className="card-text text-white">Beim Senden des Änderungsauftrags des Blocking-Status der Datei ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass das Backend läuft und das Frontend mit ihm kommunizieren kann.</p>
                </div>
            </div>
        );
    } else return;
}