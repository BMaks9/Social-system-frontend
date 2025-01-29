import {dest_api} from '../target_config'

export interface Patronage {
    id: number;
    title: string;
    description: string;
    img: string;
    disabilities_id?: number;
    current_count?: number;
    comment?: string;
  }
  export interface Disability {
    id: number;
    phone: string;
    address: string;
    status: string;
    data_created: string;
    data_compilation: string;
    data_finished: string;
    date_dilivery: string;
    creator:  string;
    moderator: string;
    patronages: Patronage[];

  }
  // export const getPatronage = async (name = ""): Promise<Patronage[]> => {
  //   return fetch(`${dest_api}/patronages/?patronageName=${name}`)
  //     .then((response) => response.json())  // Ответ будет массивом объектов
  // };
  
  
  export const getPatronageId = async (
    id: number | string
  ): Promise<Patronage> => {
    return fetch(`${dest_api}/patronages/${id}/`).then(
      (response) => response.json()
    );
  };
 
  export const getDisabilities = async (): Promise<Disability[]> => {
    return fetch(`${dest_api}/disabilities/`)
      .then((response) => response.json())  // Ответ будет массивом объектов
  };

  export const getDisabilityId = async (
    id: number | string
  ): Promise<Disability> => {
    return fetch(`${dest_api}/disabilities/${id}/`).then(
      (response) => response.json()
    );
  };

  