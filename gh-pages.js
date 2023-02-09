var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'main',
        repo: 'https://github.com/fridastenebo/meet-music-quiz.git', // Update to point to your repository  
        user: {
            name: 'Frida', // update to use your name
            email: 'frida.stenebo@storytel.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)