//import Emoji from "a11y-react-emoji";

export default function StatusChangeRequest(props) {
    const blockEmoji = (blockFile) => {
        // Hinzufügen von Emojis wie in https://blog.logrocket.com/adding-emojis-react-app/ beschrieben
        if (blockFile) {
            return <span role="img" aria-label="sperren">❌</span>;
        } else {
            return <span role="img" aria-label="entsperren">✔️</span>; 
        }
    }
    
    return(
        <tr>
            <td>{props.requestIndex}</td>
            <td>{(new Date(props.requestData.requestDate)).toLocaleDateString()}</td>
            <td>{(new Date(props.requestData.requestDate)).toLocaleTimeString()}</td>
            <td>{decodeURIComponent(escape(props.requestData.fileName))}</td>
            <td>{blockEmoji(props.requestData.blockFile)}</td>
            <td><button onClick={() => props.handleEntrySelection(props.requestIndex)}>Details</button></td>
        </tr>
    );
}