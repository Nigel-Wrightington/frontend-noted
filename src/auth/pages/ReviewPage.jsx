import { useState } from "react";
import "./ReviewPage.css";
import { createReview } from "../../api/api";
import { useAuth } from "../AuthContext";

export default function ReviewPage() {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(3);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const { token } = useAuth();

  function handleImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function validate() {
    return (
      artist.trim() &&
      album.trim() &&
      genre.trim() &&
      rating >= 1 &&
      rating <= 5
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      setStatusMessage(
        "Please fill Artist, Album, Genre and choose a rating between 1 and 5."
      );
      return;
    }

    // Prepare form data for later API integration
    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("genre", genre);
    formData.append("rating", rating);
    formData.append("description", description);
    if (imageFile) formData.append("cover", imageFile);

    // Call API to create the review
    setStatusMessage("Posting review...");
    try {
      const { token } = useAuth();
      // createReview expects FormData and optional token
      await createReview(formData, token);
      setStatusMessage("Review posted successfully.");
    } catch (err) {
      console.error("Failed to post review:", err);
      setStatusMessage(err.message || "Failed to post review.");
    }

    // The following code resets the code after you submit a review.
    setArtist("");
    setAlbum("");
    setGenre("");
    setRating(3); //this is just the default for whats open when you open the page.
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
  }

  return (
    <div className="review-page">
      <h2>Write an Album Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Artist name
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist name"
            required
          />
        </label>

        <label>
          Album title
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album title"
            required
          />
        </label>

        <label>
          Genre
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre (e.g. Rock, Jazz)"
            required
          />
        </label>

        <label>
          Rating: {rating}
          <input
            type="range"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </label>

        <label>
          Short description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short review (optional)"
            rows={4}
          />
        </label>

        <label>
          Cover art (image)
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="cover preview" className="cover-img" />
            <div className="image-filename">{imageFile && imageFile.name}</div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={!validate()}>
            Post
          </button>
          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}
