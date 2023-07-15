import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './TaskForm.module.css';

// Interface
import { ITask } from '../interfaces/Task';

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, level: number): void;
}

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [level, setLevel] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setLevel(task.level);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setErrorMessage('O Título da tarefa não pode estar vazio.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

      if (handleUpdate) {
        handleUpdate(id, title, level);
      } else {
        const newId = Math.floor(Math.random() * 10000);

        const newTask: ITask = { id: newId, title, level };

        setTaskList!([...taskList, newTask]);

        setTitle('');
        setLevel(0);
      }
    
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      if (e.target.value !== '') {
        setLevel(parseInt(e.target.value));
      } else {
        setLevel(0);
      }
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="level">Level:</label>
        <input
          type="text"
          name="level"
          placeholder="Nível da tarefa"
          onChange={handleChange}
          value={level}
        />
      </div>
      <input type="submit" value={btnText} />
      {errorMessage && (
        <p className={styles.errorMessage}> {errorMessage} </p>
      )}
    </form>
  );
};

export default TaskForm;
