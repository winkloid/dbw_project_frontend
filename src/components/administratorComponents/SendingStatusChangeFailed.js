export default function SendingStatusChangeFailed(props) {
    if(props.hasFailed) {
        return(
            <div>
                <p>Beim Senden des Änderungsauftrags des Blocking-Status der Datei ist ein Fehler aufgetreten. Bitte stellen Sie sicher, dass das Backend läuft und das Frontend mit ihm kommunizieren kann.</p>
            </div>
        );
    } else return;
}