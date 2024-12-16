import {dest_api} from '../target_config'
export interface Patronage {
    id: number;
    title: string;
    description: string;
    img: string;
  }
  export const getPatronage = async (name = ""): Promise<Patronage[]> => {
    return fetch(`${dest_api}/patronages/?patronageName=${name}`)
      .then((response) => response.json())  // Ответ будет массивом объектов
  };
  
  
  export const getPatronageId = async (
    id: number | string
  ): Promise<Patronage> => {
    return fetch(`${dest_api}/patronages/${id}/`).then(
      (response) => response.json()
    );
  };
 