import { StyledCard } from "./stylingComponent";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { POSTS_URL } from "../utils/constants";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";

const PostCard = ({ postData, handleDelete }) => {
  const [showComments, setShowComments] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = async (postData) => {
    const data = await fetch(`${POSTS_URL}/${postData.id}/comments`);

    const json = await data.json();

    setShowComments(json);

    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {postData.title}
        </Typography>
        <Typography variant="p" color="text.secondary" component="div">
          {postData.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Dialog open={showPopup} onClose={handleClose}>
          <DialogTitle>Comments</DialogTitle>

          <DialogContent>
            {showComments.map((comment) => (
              <div key={comment.id}>
                <h4>
                  {" "}
                  <AccountCircleIcon /> {comment.name}
                </h4>
                <h5>
                  <MailOutlineTwoToneIcon sx={{ fontSize: 12 }} />{" "}
                  {comment.email}
                </h5>
                <p>{comment.body}</p>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button onClick={() => handleClick(postData)}>
          <CommentIcon color="action" sx={{ fontSize: 35 }} />
        </Button>
        <Button onClick={() => handleDelete(postData.id)}>
          <DeleteIcon color="action" sx={{ fontSize: 35 }} />
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default PostCard;
