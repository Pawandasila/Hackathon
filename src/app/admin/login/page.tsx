"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"


const AdminPage = () => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const router = useRouter()
    const onsubmit = () => {
        //TODO: validation
        router.push('/admin/manage')
    }

    return (
        <>
            <div>
                <label>Username: </label>
                <input type={"text"} onChange={(e) => setUser(e.target.value)} />
                <label>Pass: </label>
                <input type={"password"} onChange={(e) => setPass(e.target.value)} />
                <button onClick={onsubmit} className="hover:cursor-pointer">Submit</button>
            </div>
        </>
    )
}

export default AdminPage