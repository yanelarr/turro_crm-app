import Link from "next/link";

export default function Menucard({title, items}) {
    return (
        <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                    <h6>{title}</h6>
                </li>
                {
                    items.map( ({text}, i) => (
                        <li key={i}>
                            <a className="dropdown-item">{text}</a>
                        </li>                        
                    ))
                }
            </ul>
        </div>
    )
}