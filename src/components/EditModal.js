import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../rtk/ModalSlice";
import { useRef } from "react";
import { UpdateTask } from "../rtk/TodosSlice";
import Swal from "sweetalert2";

function EditModal() {
  let titleInput = useRef();
  let descriptionInput = useRef();

  const show = useSelector((state) => state.modal.isOpen); //get state
  const selectedTodo = useSelector((state) => state.modal.selectedTodo); //get state

  const dispatch = useDispatch();

  //   const [show, setShow] = useState(false);

  const handleClose = () => dispatch(closeModal());
  //   const handleShow = () => dispatch(updateState(true));
  let EditTask = () => {
    if (titleInput.current.value === "") {
      Swal.fire({
        title: "The Task Title Is Required",
      });
    } else {
      let newDetails = {
        id: selectedTodo.id,
        title: titleInput.current.value,
        description: descriptionInput.current.value,
      };
      console.log(newDetails);
      dispatch(UpdateTask(newDetails));
      handleClose();
    }

    // dispatch(UpdateTodo(updatedTodo));
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Todo </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                ref={titleInput}
                name="title"
                type="text"
                placeholder="todo title"
                autoFocus
                defaultValue={selectedTodo && selectedTodo.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                ref={descriptionInput}
                name="desc"
                type="text"
                placeholder="todo description"
                defaultValue={selectedTodo && selectedTodo.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              EditTask();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
