const parseEnv = () => {
    const env = process.env;
    const rssVariables = Object.keys(env)
        .filter(key => key.startsWith('RSS_'))
        .map(key => `${key}=${env[key]}`);

    if (rssVariables.length > 0) {
        console.log(rssVariables.join('; '));
    } else {
        console.log('No RSS_ variables found');
    }
};

parseEnv();
