import React from "react";
// import Modal from "react-modal";
// import styles from "./Popup.module.css";

// const PopupModal = ({ isOpen, onClose }) => {
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.widows_size}>
//       <div
//         className={styles.modal}
//         id="exampleModal"
//         tabIndex="-1"//for keyboard navigation
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"

//       >
//         <div className="modal-dialog" >
//           <div className="modal-content">
//             <div className="modal-header">
//               <button
//                 type="button"
//                 className={styles.close}
//                 data-dismiss="modal"
//                 onClick={onClose}
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//               <h5 className={styles.modaltitle} id="exampleModalLabel">
//                 Modal title
//               </h5>
//             </div>
//             <div className={styles.modelbody}>
//               <form>
//                 <div className="form-group">
//                   <label htmlFor="exampleInputEmail1">Email address</label>{" "}
//                   <br />
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                     placeholder="Enter email"
//                   />
//                 </div>
//                 <br />
//                 <div className="form-group">
//                   <label htmlFor="exampleInputPassword1">Phone Number</label>
//                   <br/>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     placeholder="Password"
//                   />
//                 </div>

//                 <button type="submit" className={styles.primarybtn}>
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default PopupModal;

// import Modal from "@material-ui/core/Modal";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Stack from '@mui/material/Stack';

// export default function PopupModal({ isOpen, onClose }) {
//   const [open, setOpen] = React.useState(false);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   return (
//     <Modal
//       onClose={() => {alert("please fill this form"); }}
//       open={isOpen}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "white",
//           borderRadius: 10,
//           width: "50%",
//           height: "30%",
//         }}
//       >
//         <form style={{ padding: 10 }}>
//           <TextField
//             id="fName"
//             label="First Name"
//             variant="outlined"
//             style={{ width: "32%", padding: 10 }}
//           />
//           <TextField
//             id="mName"
//             label="Middle Name"
//             variant="outlined"
//             style={{ width: "32%", padding: 10 }}
//           />
//           <TextField
//             id="lName"
//             label="Last Name"
//             variant="outlined"
//             style={{ width: "32%", padding: 10 }}
//           />
//           <TextField
//             id="email"
//             label="Email"
//             variant="outlined"
//             style={{ width: "60%", padding: 10 }}
//           />
//           <TextField
//             id="mNum"
//             label="Mobile Number"
//             variant="outlined"
//             style={{ width: "40%", padding: 10 }}
//           />
          {/* <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label> <br />
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Phone Number</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div> */}

//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" color="success" onClick={onClose}>
//               Submit
//             </Button>
//           </Stack>
//         </form>
//       </div>
//     </Modal>
//   );
// }
