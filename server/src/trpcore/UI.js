export class UI {
    constructor(){
        // init all components
        M.AutoInit();
    }

    get_modal_instance(elem){
        return M.Modal.getInstance(elem);
    }
}