import './Notes.css';
import NotesForm from '../../components/NotesComponent/NotesForm/NotesForm';
import NotesList from '../../components/NotesComponent/NotesList/NotesList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/ModalWindow/Spinner/Spinner';

const Notes = () => {
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState({ note: '' });
    const [notes, setNotes] = useState([]);
    // const [possibilityEdit, setPossibilityEdit] = useState(true);

    let changeInputNote = e => {
        let name = e.target.name;
        let value = e.target.value;
        setNote(prevState => { return { ...prevState, [name]: value } })
    }
    let submitNote = async e => {
        e.preventDefault();
        setLoading(true);
        let newNote = { ...note };
        await axios.post('/notes.json', newNote)
            .then(response => console.log(response))
            .catch(console.error)
        setLoading(false)
    }
    useEffect(async () => {
        let noteList = await axios.get('/notes.json')
            .then(response => { return response.data })
            .catch(console.error);
        noteList = Object.keys(noteList).map(id => {
            let mark = noteList[id];
            mark.id = id;
            return noteList[id]
        })
        setNotes(noteList)
    }, []);
    let removeNote = async id => {
        setLoading(true)
        let index = notes.findIndex(i => i.id === id);
        let copynotes = [...notes];
        await axios.delete('/notes/' + copynotes[index].id + '.json')
            .then(response => console.log(response))
            .catch(console.error)
        setLoading(false)
    }
    let postEditNote = async (e, id) => {
        let index = notes.findIndex(i => i.id === id);
        let copyNotes = [...notes];
        let value = { note: e.target.value };
        console.log(e.target.value);
        await axios.patch('/notes/' + copyNotes[index].id + '.json', value)
            .then(response => console.log(response))
            .catch(console.error)
    }
 
    // let enableToEdit = () => {
    //     setPossibilityEdit(false)
    // }
    // let disableToEdit = () => {
    //     setPossibilityEdit(true)
    // }
    // console.log(notes);
    let addNotesList = notes.map(list => {
        return <NotesList
            key={list.id}
            value={list.note}
            // name='note'
            delete={() => removeNote(list.id)}
            // edit={() => enableToEdit(list.id)}
            // disabled={possibilityEdit}
            changeNote={(e)=>postEditNote(e, list.id)}
            // blur={(e)=>postEditNote(e, list.id)}
        />
    })
    return (
        <div className='Notes'>
            <NotesForm
                name='note'
                change={changeInputNote}
                submit={submitNote}
            />
            {loading ? <Spinner /> : null}
            {addNotesList}
        </div>
    )
}

export default Notes