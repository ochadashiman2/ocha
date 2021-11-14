export const SideMenu: React.VFC<{}> = () =>
    <nav className='menu'>
        <ul className='menu_list'>
            <li><a href='#general'>General</a></li>
            <li><a href='#format'>Format</a></li>
            <li><a href='#style'>Style</a></li>
            <li><a href='#import_export'>Import/Export</a></li>
            <li><a href='#about'>About</a></li>
        </ul>
    </nav>;