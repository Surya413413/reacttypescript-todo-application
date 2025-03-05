
import { Component } from "react";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import Header from "../Header";
import NoteItems from "../NoteItems";
import "./index.css";

class HomePage extends Component {
  state = { notelist: [], searchinput: "" };

  componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      console.error("JWT Token is missing!");
      return;
    }
    const url = "http://localhost:3000/notes";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      this.setState({ notelist: data });
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  onClickCreateItems = () => {
    window.location.href = "/notes/create";
  };

  onDeleteItem = async (id) => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const url = `http://localhost:3000/notes/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to delete item. Status: ${response.status}`);
      }

      this.setState((prevState) => ({
        notelist: prevState.notelist.filter((each) => each.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  onChangeSearch = (event) => {
    this.setState({ searchinput: event.target.value });
  };

  // Toggle Pin Status
  togglePin = async (id, pinned) => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const url =`http://localhost:3000/notes/${id}/pin`;
   
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinned: !pinned }),
      };
      
      const response = await fetch(url, options);
   
      console.log(response)
      if (!response.ok) {
          throw new Error(`Failed to update pin status. Status: ${response.status}`);
      }
      
      const data = await response.text()
      console.log("enetering")
      console.log(data)
      // Update state after pinning

      this.setState(prevState => ({
        notelist: prevState.notelist.map(note =>
            note.id === id ? { ...note, pinned: !pinned } : note
        ),
    }));
    this.getNotes();
      
    } catch (error) {
      console.error("Error updating pin status:", error.message);
    }
  };

  // Toggle Archive Status
  toggleArchive = async (id, archived) => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const url = `http://localhost:3000/notes/${id}/archive`;;
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archived: !archived }),
      };

      
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`Failed to update archive status. Status: ${response.status}`);
      }

      // Update state after archiving
      this.setState(prevState => ({
          notelist: prevState.notelist.map(note =>
              note.id === id ? { ...note, archived: !archived } : note
          ),
      }));
    } catch (error) {
      console.error("Error updating archive status:", error.message);
    }
  };

  render() {
    const { notelist, searchinput } = this.state;
    const filteredNotes = notelist.filter((each) =>
      each.title.toLowerCase().includes(searchinput.toLowerCase())
    );

    const pinnedNotes = filteredNotes.filter((note) => note.pinned && !note.archived);
const unpinnedNotes = filteredNotes.filter((note) => !note.pinned && !note.archived);
const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <>
        <Header />
        <div className="note-container">
          <ul className="ul-container">
            <h1>Notes</h1>
            <div className="note-createbutton">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search notes"
                  id="search"
                  onChange={this.onChangeSearch}
                  value={searchinput}
                  className="search-input"
                />
                <FaSearch />
              </div>
              <button className="button-delete" onClick={this.onClickCreateItems}>
                Create Note
              </button>
            </div>

            {/* Pinned Notes */}
            {pinnedNotes.length > 0 && (
              <>
                <h2>Pinned Notes</h2>
                {pinnedNotes.map((each) => (
                  <NoteItems
                    key={each.id}
                    notesdata={each}
                    ondeleteitem={this.onDeleteItem}
                    togglePin={this.togglePin}
                    toggleArchive={this.toggleArchive}
                  />
                ))}
              </>
            )}

            {/* Unpinned Notes */}
          
            {unpinnedNotes.map((each) => (
              <NoteItems
                key={each.id}
                notesdata={each}
                ondeleteitem={this.onDeleteItem}
                togglePin={this.togglePin}
                toggleArchive={this.toggleArchive}
              />
            ))}

            {/* Archived Notes */}
            {archivedNotes.length > 0 && (
              <>
                <h2>Archived Notes</h2>
                {archivedNotes.map((each) => (
                  <NoteItems
                    key={each.id}
                    notesdata={each}
                    ondeleteitem={this.onDeleteItem}
                    togglePin={this.togglePin}
                    toggleArchive={this.toggleArchive}
                  />
                ))}
              </>
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default HomePage;












