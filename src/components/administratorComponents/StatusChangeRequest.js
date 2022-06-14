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
            <th>{props.requestIndex}</th>
            <td>{(new Date(props.requestData.requestDate)).toLocaleDateString()}</td>
            <td>{(new Date(props.requestData.requestDate)).toLocaleTimeString()}</td>
            <td>{decodeURIComponent(escape(props.requestData.fileName))}</td>
            <td>{blockEmoji(props.requestData.blockFile)}</td>
            <td><button class="btn bg-primary text-white" onClick={() => props.handleEntrySelection(props.requestIndex)}>Details</button></td>
        </tr>
    );
}