import { cp } from 'shelljs';

// Copy all the view templates
cp( '-R', '.env', 'dist/' );

// Copy all the view templates
cp( '-R', 'views/', 'dist/' );

// Copy all the assets
cp( '-R', 'public/', 'dist/' );
