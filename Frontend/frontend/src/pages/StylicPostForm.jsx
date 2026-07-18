import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const StylicPostForm = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function submitHandler(e) {

        e.preventDefault();

        if (!image) {
            alert("Please select an image.");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("image", image);
            formData.append("caption", caption);

            const res = await axios.post(
                "http://localhost:3000/new-post",
                formData
            );

            console.log(res.data);

            alert("Post Uploaded Successfully");

            setImage(null);
            setPreview(null);
            setCaption("");

            e.target.reset();



        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
      navigate("/feed")

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-100 flex items-center justify-center p-6">

            <form
                onSubmit={submitHandler}
                className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8 space-y-6"
            >

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create New Post
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Share your best moments with everyone.
                    </p>

                </div>

                {/* Upload */}

                <label className="border-2 border-dashed border-gray-300 rounded-2xl h-72 flex items-center justify-center cursor-pointer overflow-hidden hover:border-violet-500 transition">

                    {
                        preview ?

                            <img
                                src={preview}
                                alt=""
                                className="w-full h-full object-cover"
                            />

                            :

                            <div className="text-center">

                                <div className="text-6xl">
                                    📷
                                </div>

                                <p className="text-gray-500 mt-4">
                                    Click to Upload Image
                                </p>

                            </div>

                    }

                    <input

                        type="file"

                        name="image"

                        className="hidden"

                        accept="image/*"

                        onChange={(e) => {

                            const file = e.target.files[0];

                            setImage(file);

                            if (file) {

                                setPreview(URL.createObjectURL(file));

                            }

                        }}

                    />

                </label>

                {/* Caption */}

                <div>

                    <label className="text-sm font-semibold text-gray-700">

                        Caption

                    </label>

                    <textarea

                        rows="4"

                        maxLength={150}

                        placeholder="Write something amazing..."

                        value={caption}

                        onChange={(e) => setCaption(e.target.value)}

                        className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-200 resize-none"

                    />

                    <div className="flex justify-end mt-2">

                        <span className="text-xs text-gray-400">

                            {caption.length}/150

                        </span>

                    </div>

                </div>

                {/* Button */}

                <button

                    type="submit"

                    disabled={loading}

                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition duration-300 shadow-lg hover:shadow-violet-400 disabled:opacity-60"

                >

                    {

                        loading ?

                            "Uploading..."

                            :

                            "🚀 Publish Post"

                    }

                </button>

            </form>

        </div>

    );

}

export default StylicPostForm;