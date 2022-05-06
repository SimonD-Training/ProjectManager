export interface notesI {
    note_id: string,
    project_id: string,
    notes: string,
    active_date: string
}

export let template_note = {
    note_id: "",
    project_id: "",
    notes: "",
    active_date: new Date().toString()
}