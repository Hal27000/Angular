export interface Task {
    id?: number; //initially optional so that when we initially create the taks in the json server it's not going to give back an error
    taskName: string;
    date: Date;
    reminder: boolean;
    image: string;
      }