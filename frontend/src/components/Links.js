import { ThemeContext } from "./context/ThemeContext";

// const ThemedLink = ({ children, ...props }) => {
//     return (
//         <ThemeContext.Consumer>
//             {({ theme }) => (
//                 <a className={`has-text-grey-${theme === 'dark' ? 'light' : 'dark'}`} {...props}>
//                     {children}
//                 </a>
//             )}
//         </ThemeContext.Consumer>
//     );
// }

const IconLink = ({ children, ...props }) => {
    return (
        <a className="icon-text" href={props.href}>
            <span className="icon">
                <props.icon />
            </span>
            <span>
                { children }
            </span>
        </a>
    );
}

export { IconLink };