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
            <label htmlFor="make" className="form-label">Make</label>
            <input name="make" className="form-control" type="text" />

            <label htmlFor="model" className="form-label">Model</label>
            <input name="model" className="form-control" type="text"/>

            <label htmlFor="image" className="form-label">Image</label>
            <input name="image" className="form-control" type="text" />

            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" className="form-control"  type="text" />

            <button type="submit">Create Car</button>
        </form>
        
    )
}