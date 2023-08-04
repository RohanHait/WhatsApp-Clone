 export default function setTheme(theme ) {
   // Whenever the user explicitly chooses light mode
   if(theme === "light")
     localStorage.theme = 'light'
   
   // Whenever the user explicitly chooses dark mode
   else if(theme === "dark")
     localStorage.theme = 'dark'
   
   // Whenever the user explicitly chooses to respect the OS preference
   else 
     localStorage.removeItem('theme')

     
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
}