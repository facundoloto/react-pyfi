import Swal from "sweetalert2";

export async function signUp (response) {
    let redirect = true;
    
    if (response.status === 200) {
        
        Swal.fire({
            icon: "success",
            title: "user has created",
            showConfirmButton: false,
            timer: 1500,
        });
        //render to home if user is loggein
       return redirect;
    } else {
        redirect = false;
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: " try again",
        });

        return redirect;
    }
}
