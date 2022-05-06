export interface projectI {
    project_id: string,
    project_title: string,
    project_description: string,
    project_start_dt: string,
    project_due_dt: string
}

export let template_project = {
    project_id: "",
    project_title: "",
    project_description: "",
    project_start_dt: new Date().toString(),
    project_due_dt: new Date().toString()
};