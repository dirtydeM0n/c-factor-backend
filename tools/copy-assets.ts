import * as shell from 'shelljs';

// Copy all the view templates
shell.cp( '-R', '.env', 'dist/' );

// Copy all the view templates
shell.cp( '-R', 'views/', 'dist/' );

// Copy all the assets
shell.cp( '-R', 'public/', 'dist/' );
