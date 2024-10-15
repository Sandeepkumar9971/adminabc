import { makeRequest } from "../request";
import { routes } from "../endpoints";

export class teams_client{
    static async add(data:any){
        try{
            const response = await makeRequest({
                method: 'POST',
                url:routes.team_add,
                data:data
            })
            return response
        }
        catch(e){
            console.log(e)
        }
    }
    static async all(){
        try{
            const response = await makeRequest({
                method: 'POST',
                url:routes.team_all,
            })
            return response
        }
        catch(e){
            console.log(e)
        }
    }

}