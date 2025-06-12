export const getDisplayName = (email) => {
    if (!email || typeof email !== 'string') return 'Anonymous';

    let name = email.split('@')[0];

    // Format the name nicely
    name = name.replace(/[._]/g, ' ');
    name = name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return name;
};