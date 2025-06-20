"use client";
import { useState } from "react";

const ManagePage = () => {
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', productName)
        formData.append('description', description)
        if (image) {
            formData.append('image', image)
        }

        const res = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
        })

        const result = await res.json()
        console.log('Server Response:', result)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setImage(file)
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>Submit Product</h2>
        <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
        /><br />
        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        /><br />
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        /><br />
        <button type="submit">Submit</button>
        </form>
    )
}

export default ManagePage