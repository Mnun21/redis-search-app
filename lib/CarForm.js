//** React component that will handle user input **//
//** Will make request that will handle API route */

export default function CarForm() {

    /*
    Tip for handling form data in a react component
    Convert event target(HTML form) to FormData class
    FormData class will organize fields into key value pairs
    Convert form data into a JS object using .fromEntries
    Form name must match key from Redis schema
    */

    const handleSubmit = async (event) => {
        //prevents page from refreshing upon submit
        event.preventDefault();
        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        //final step: make a request to the API endpoint
        const res = await fetch('/api/cars', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        console.log(result)
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="make" value="Make" type="text" />
            <input name="model" value="Model" type="text"/>
            <input name="image" value="Image" type="text" />
            <textarea name="description" value="Description" type="text" />

            <button type="submit">Create Car</button>
        </form>
    )
}