import { useTheme } from './theme-provider'
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if(theme == "dark"){
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <Button className='p-2 rounded-md bg-accent text-primary hover:bg-primary hover:text-accent' onClick={toggleTheme}>
      {theme == "light" ? <Sun/> : <Moon/>}
    </Button>
  )
}

export default ModeToggle