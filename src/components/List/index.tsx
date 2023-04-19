import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Item } from "./item";

const people = [
    {
        name: "Jane Cooper",
        title: "Paradigm Representative",
        role: "Admin",
        email: "janecooper@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    }, {
        name: "Jane Cooper",
        title: "Paradigm Representative",
        role: "Admin",
        email: "janecooper@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    }, {
        name: "Jane Cooper",
        title: "Paradigm Representative",
        role: "Admin",
        email: "janecooper@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    }, {
        name: "Jane Cooper",
        title: "Paradigm Representative",
        role: "Admin",
        email: "janecooper@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    }, {
        name: "Jane Cooper",
        title: "Paradigm Representative",
        role: "Admin",
        email: "janecooper@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    // More people...
];

export const List = () => {
    return (
        <ul
            role="list"
            className="grid grid-cols-1  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
            {people.map(({
               name,
               title,
               role,
               email,
               imageUrl
            }) => (
                <Item name={name}
                title={title}
                role={role}
                email={email}
                imageUrl={imageUrl} />
            ))}
        </ul>
    );
}
