
import { Link } from "react-router-dom";
import { BsPin, BsPinFill } from "react-icons/bs";
import { MdArchive, MdUnarchive } from "react-icons/md";
import "./index.css"
const NoteItems = (props) => {
     const {notesdata,ondeleteitem,togglePin,toggleArchive} = props
    const {title,content,created_at,updated_at,category,id, pinned, archived} = notesdata
   
    const handleReload = () => {
        window.location.href = `/notes/${id}`; // Navigate & Reload
      }
    const onClickdeleteitem = () => {
        console.log("🛠 Deleting item with ID:", id);  // Debugging log
        ondeleteitem(id)
    }
    return (
      <>
        <div className="noteitems-container">
        <br/>
        <button className="title-button"  onClick={handleReload}>
        <h1>{title}</h1>
      </button>
<button className="button-pinned" onClick={() => togglePin(id, pinned)}>
{pinned ? <BsPinFill size={24} color="gold" /> : <BsPin size={24} color="gray" />}
</button>
<button  className="button-pinned" onClick={() => toggleArchive(id, archived)}>
{archived ?  <MdUnarchive size={20} color="green" /> : <MdArchive size={20} />}
</button>
       <button className="button-delete" onClick={onClickdeleteitem}>Delete Note</button>
        <br/> 
       </div>
       </>
    )
}
 export default NoteItems