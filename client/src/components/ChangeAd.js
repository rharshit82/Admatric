import React, {useState,useEffect} from "react";
import { Form, Button } from "react-bootstrap";
const ChangeAd = ({adSubmit, highestAmount}) => {
  const [img, setImg] = useState(null);
  const [formData,setFormData]=useState({
    title: "",
    desc: "",
    link: "",
    value: parseFloat(highestAmount)+0.1
  })
  useEffect(() =>{
    setFormData({...formData, value: Math.round((parseFloat(highestAmount) + 0.1) * 10) / 10});
  }, [highestAmount])
  
  const captureImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setImg(Buffer(reader.result));
    };
  };
  
  const submitForm = (e) =>{
    e.preventDefault();
    adSubmit(e, formData.title, formData.desc,formData.link, formData.value.toString(), img);
    setFormData({
      title: "",
    desc: "",
    link: "",
    value: highestAmount+0.1
    })
  }
  return (
    <div className="formdiv">
      <Form className="form" onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLink">
          <Form.Label>Link</Form.Label>
          <Form.Control type="text" placeholder="Enter Link"value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLink">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            multiple={false}
            onChange={(e) => captureImage(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAmount">
          <Form.Label>Amount for Advertisement</Form.Label>
          <Form.Control
          value={formData.value}
            type="number"
            min={Math.round((parseFloat(highestAmount) + 0.1) * 10) / 10}
            step="0.1"
            placeholder="Enter Amount"
            onChange={(e) => setFormData({...formData, value: e.target.value})}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ChangeAd;
