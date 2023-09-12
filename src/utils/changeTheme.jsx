import { themeStore } from "../store/themeStore";

const OnClickTheme = () => {
    const isTheme = themeStore((state => state.theme));
    const changeTheme = themeStore((state) => state.changeTheme);

    const change = () => {
        if (isTheme == "Light") {
            document.body.classList.add('dark');
            changeTheme("Dark");
        } else {
            document.body.classList.remove('dark');
            changeTheme("Light");
        }
    };

    return (
        <>
            <button id="darkmode-toggle" onClick={change}>{isTheme}</button>
        </>
    );
};

export default OnClickTheme;