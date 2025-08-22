import { useEffect, useRef, useState } from "react";
import "./Todos.css";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  ChangeTodoStatus,
  deleteAllTodos,
  deleteTodo,
} from "../rtk/TodosSlice";
import Swal from "sweetalert2";
import { openModal, updateState } from "../rtk/ModalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
function Todos() {
  const todosList = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosList));
  }, [todosList]);

  // map todos list
  let todosElementsList = todosList.map((todo) => {
    return (
      <div key={todo.id} className="col-md-6 col-lg-4 mb-4">
        <div className="card-todo p-3 h-100  shadow-lg">
          {todo.status ? (
            <h2 className="todo-title text-decoration-line-through ">
              {todo.title}
            </h2>
          ) : (
            <h2 className="todo-title ">{todo.title}</h2>
          )}
          {todo.status ? (
            <p className="todo-desc text-decoration-line-through">
              {todo.description}
            </p>
          ) : (
            <p className="todo-desc">{todo.description}</p>
          )}

          <div className="todo-actions d-flex justify-content-evenly gap-2 mt-3 flex-wrap ">
            <button
              className="btn btn-primary fw-bold edit-btn "
              onClick={() => {
                // dispatch(ChangeTodoStatus(todo));
                changeTaskStatus(todo);
              }}
            >
              {todo.status === true ? (
                <FontAwesomeIcon icon={faCircleXmark} />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} />
              )}
            </button>
            <button
              className="btn btn-success fw-bold edit-btn "
              onClick={() => {
                dispatch(openModal(todo));
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              className="btn btn-danger fw-bold delete-btn"
              onClick={() => {
                deleteTask(todo);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    );
  });
  //   inputs refs
  let titleInput = useRef();
  let descInput = useRef();

  //   add new task
  let addNewTask = () => {
    if (titleInput.current.value === "") {
      Swal.fire({
        title: "Task Title Is Required",
      });
    } else {
      // first check if exist before or new task
      let flag = true;
      let todoTitle = titleInput.current.value;
      for (let i = 0; i < todosList.length; i++) {
        if (todoTitle === todosList[i].title) {
          flag = false;
          break;
        }
      }

      //   mean is new task
      if (flag) {
        let newId;

        // get max id
        let idList = [];
        for (let i = 0; i < todosList.length; i++) {
          idList.push(todosList[i].id);
        }

        if (todosList.length === 0) {
          newId = 1;
        } else {
          newId = Math.max(...idList) + 1;
        }
        dispatch(
          addTodo({
            id: newId,
            title: titleInput.current.value,
            description: descInput.current.value,
            status: false, // must add this property
          })
        );

        titleInput.current.value = "";
        descInput.current.value = "";
      } else {
        console.log("This task Already Exist");
        Swal.fire({
          title: "This task Already Exist",
        });
      }
    }
  };

  // delete task
  let deleteTask = (todo) => {
    Swal.fire({
      title: "Make Sure To Delete This Task?",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        dispatch(deleteTodo(todo));
      }
    });
  };

  let changeTaskStatus = (todo) => {
    Swal.fire({
      title:
        todo.status === false
          ? "Completed This Task?"
          : "Incomplete This Task?",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        dispatch(ChangeTodoStatus(todo));
      }
    });
  };
  let deleteAllTasks = () => {
    Swal.fire({
      title: "Make Sure To Delete All Tasks?",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        dispatch(deleteAllTodos());
      }
    });
  };
  return (
    <div className="todos">
      <div className="container py-5">
        <h1 className="todos-title text-center fw-bold mb-4 fs-1">To-Do App</h1>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <form
              className="d-flex justify-content-center flex-column"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Submitted");
              }}
            >
              <input
                ref={titleInput}
                type="text"
                id="title"
                placeholder="task title"
              />
              <input
                ref={descInput}
                type="text"
                id="description"
                placeholder="task description"
              />
              <button
                type="submit"
                className="add-btn mt-3"
                onClick={() => {
                  addNewTask();
                }}
              >
                Add New Task
              </button>
            </form>
          </div>
        </div>

        {todosList.length && (
          <h2 className="todos-list-title mt-5  text-center fw-bold fs-2">
            Task List
          </h2>
        )}

        <div className="row mt-4">{todosElementsList}</div>
        {todosList.length > 0 && (
          <div className=" mt-5 mb-5  d-flex flex-column gap-3 flex-sm-row justify-content-center align-items-center">
            <button
              onClick={() => {
                deleteAllTasks();
              }}
              className="delete-all flex-grow-1"
            >
              Delete All Tasks
            </button>
            <button
              onClick={() => {
                // completeAllTasks();
              }}
              className="complete-all flex-grow-1"
            >
              Complete All Tasks
            </button>
          </div>
        )}
        <EditModal />
      </div>
    </div>
  );
}
export default Todos;
