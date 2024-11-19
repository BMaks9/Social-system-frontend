export interface Patronage {
    id: number;
    title: string;
    description: string;
    img: string;
  }
  export const getPatronage = async (name = ""): Promise<Patronage[]> => {
    return fetch(`http://localhost:8000/patronages/?patronageName=${name}`)
      .then((response) => response.json())  // Ответ будет массивом объектов
  };
  
  
  export const getPatronageId = async (
    id: number | string
  ): Promise<Patronage> => {
    return fetch(`http://localhost:8000/patronages/${id}/`).then(
      (response) => response.json()
    );
  };
 