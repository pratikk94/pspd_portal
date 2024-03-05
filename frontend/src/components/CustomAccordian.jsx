import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import LinkIcon from "@mui/icons-material/Link";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const InstagramPost = ({
  id,
  name,
  description,
  image,
  link,
  initialLiked,
}) => {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    try {
      // Replace 'your-user-id' with the actual user ID
      const userId = 1;
      const response = await axios.post(
        "http://localhost:3000/api/toggle-like",
        {
          userId: userId,
          applicationId: id,
          liked: newLikedState ? 1 : 0,
        }
      );
      // Handle the response as needed
    } catch (error) {
      console.error("Error toggling like status:", error);
      // If the API call fails, revert the liked state change
      setLiked(!newLikedState);
    }
  };

  useEffect(() => {
    // Component mounts with the initialLiked status from the props
    setLiked(initialLiked);
  }, [initialLiked]);

  return (
    <div
      style={{
        border: "1px solid #dbdbdb",
        borderRadius: "3px",
        backgroundColor: "#fff",
        overflow: "hidden",
        marginBottom: "16px",
        display: "flex",
        height: "36vh",
        flexDirection: "column",
      }}
    >
      <img
        src={`https://source.unsplash.com/random/900×700/?${name}`}
        alt={name}
        style={{
          height: "12vh",
          display: "block",
          objectFit: "cover",
          borderRadius: "2vh",
        }}
      />
      <div style={{ padding: "16px", flexGrow: 1 }}>
        <Typography variant="subtitle1" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderTop: "1px solid #dbdbdb",
        }}
      >
        <IconButton onClick={toggleLike} aria-label="like button" size="large">
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <LinkIcon style={{ marginRight: "5px" }} />
          Visit Link
        </a>
      </div>
    </div>
  );
};

const InstagramPostRow = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <InstagramPost {...post} />
        </Grid>
      ))}
    </Grid>
  );
};

// const InstagramFeedAccordion = () => {
//   const [types, setTypes] = useState([]);
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const fetchTypes = axios.get("http://localhost:3000/types");
//     const fetchData = axios.get("http://localhost:3000/data");

//     axios.all([fetchTypes, fetchData]).then(
//       axios.spread((...responses) => {
//         const typesResponse = responses[0].data;
//         const dataResponse = responses[1].data;

//         setTypes(typesResponse);
//         setData(dataResponse);
//       })
//     );
//   }, []);

//   return (
//     <div>
//       {types.map((type) => (
//         <Accordion key={type.type_id}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`panel-${type.type_id}-content`}
//             id={`panel-${type.type_id}-header`}
//           >
//             <Typography>{type.type_name}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {data[type.type_name] ? (
//               <InstagramPostRow posts={data[type.type_name]} />
//             ) : (
//               <Typography>No posts available.</Typography>
//             )}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>
//   );
// };

// const InstagramFeed = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Fetch data from the backend
//         const response = await axios.get("http://localhost:3000/data");
//         const postData = response.data;
//         setPosts(postData);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <Grid container spacing={2}>
//       {Object.keys(posts).map((type_name) => (
//         <Grid item xs={12} sm={6} md={4} key={type_name}>
//           {posts[type_name].map((post) => (
//             <InstagramPost
//               key={post.id}
//               id={post.id}
//               name={post.name}
//               description={post.description}
//               image={post.image}
//               link={post.link}
//               initialLiked={post.liked} // Pass the liked state to the InstagramPost component
//             />
//           ))}
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default InstagramFeed;
const InstagramFeedAccordion = () => {
  const [types, setTypes] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchTypes = () => axios.get("http://localhost:3000/types");
    const fetchData = () => axios.get("http://localhost:3000/data");

    Promise.all([fetchTypes(), fetchData()])
      .then((responses) => {
        setTypes(responses[0].data);
        setData(responses[1].data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={{
        width: "50vw",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {types.map((type) => (
        <Accordion key={type.type_id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${type.type_id}-content`}
            id={`panel-${type.type_id}-header`}
          >
            <Typography>{type.type_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {data[type.type_name] &&
                data[type.type_name].map((post) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <InstagramPost
                      id={post.id}
                      name={post.name}
                      description={post.description}
                      image={post.image}
                      link={post.link}
                      initialLiked={post.liked}
                    />
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
export default InstagramFeedAccordion;
