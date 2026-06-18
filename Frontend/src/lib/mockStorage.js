// Mock Storage System - Frontend Only (No Backend)
// كل البيانات بتتخزن في localStorage
// لما تربط الـ backend، هتستبدل الـ functions دي بـ API calls
const API_BASE = import.meta.env.VITE_API_URL || '/api';
// Helper to get auth token
const getToken = () => localStorage.getItem('access_token');
// Helper to build authenticated headers
const authHeaders = (extra = {}) => ({
    'Content-Type': 'application/json',
    ...(getToken() ? { 'Authorization': `Bearer ${getToken()}` } : {}),
    ...extra,
});
const K = {
    PROPERTIES: 'brickly_properties', CONVERSATIONS: 'brickly_conversations',
    MESSAGES: 'brickly_messages', CURRENT_USER: 'brickly_current_user',
    USERS: 'brickly_users', BOOKINGS: 'brickly_bookings',
};
const initializeSeedData = () => {
    const seedProps = [
        {
            id: 'prop-2',
            title: 'Luxury Apartment in New Cairo',
            description: 'Elegant apartment in the heart of New Cairo. Walking distance to restaurants, shops, and entertainment.',
            location: 'New Cairo, Cairo',
            price: 3200000,
            bedrooms: 3,
            bathrooms: 2,
            size_sqft: 180,
            property_type: 'apartment',
            SELLER_id: 'user-SELLER-1',
            status: 'APPROVED',
            latitude: 30.0158,
            longitude: 31.4569,
            views: 0,
            created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
            images: [
                'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200',
            ],
        },
        {
            id: 'prop-3',
            title: 'Modern Residence in Maadi',
            description: 'Spacious urban residence with bright interiors and a peaceful garden close to Cairo schools.',
            location: 'Maadi, Cairo',
            price: 2800000,
            bedrooms: 4,
            bathrooms: 3,
            size_sqft: 250,
            property_type: 'house',
            SELLER_id: 'user-SELLER-1',
            status: 'APPROVED',
            latitude: 29.9546,
            longitude: 31.3301,
            views: 0,
            created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
            images: [
                'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200',
            ],
        },
        {
            id: 'prop-4',
            title: 'Beachfront Residence in Ain Sokhna',
            description: 'Contemporary beachfront home with pool access, stylish terrace, and views over the Red Sea.',
            location: 'Ain Sokhna, Egypt',
            price: 3800000,
            bedrooms: 4,
            bathrooms: 3,
            size_sqft: 200,
            property_type: 'seaside',
            SELLER_id: 'user-SELLER-1',
            status: 'APPROVED',
            latitude: 29.5432,
            longitude: 32.3456,
            views: 0,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200',
            ],
        },
        {
            id: 'prop-5',
            title: 'Contemporary Villa in Sheikh Zayed',
            description: 'A modern family villa with private garden, pool, and high-end finishes in the heart of Sheikh Zayed.',
            location: 'Sheikh Zayed, Giza',
            price: 5200000,
            bedrooms: 5,
            bathrooms: 4,
            size_sqft: 320,
            property_type: 'villa',
            SELLER_id: 'user-SELLER-1',
            status: 'APPROVED',
            latitude: 30.0360,
            longitude: 31.0025,
            views: 0,
            created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
            images: [
                'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1576675789364-336b46509edf?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1560185127-6de3d30bd3fb?auto=format&fit=crop&w=1200',
            ],
        },
        {
            id: 'prop-6',
            title: 'Penthouse Loft in Zayed City',
            description: 'Luxurious rooftop penthouse with sweeping city views, designer kitchen, and premium amenities.',
            location: 'Zayed City, Giza',
            price: 4500000,
            bedrooms: 3,
            bathrooms: 3,
            size_sqft: 210,
            property_type: 'penthouse',
            SELLER_id: 'user-SELLER-1',
            status: 'APPROVED',
            latitude: 30.0123,
            longitude: 31.2045,
            views: 0,
            created_at: new Date().toISOString(),
            images: [
                'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200',
                'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200',
            ],
        },
    ];
    const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
    if (props.length === 0) {
        localStorage.setItem(K.PROPERTIES, JSON.stringify(seedProps));
    }
    else {
        const merged = [...props];
        seedProps.forEach((seed) => {
            const index = merged.findIndex((p) => p.id === seed.id);
            if (index === -1) {
                merged.push(seed);
            }
            else {
                merged[index] = {
                    ...merged[index],
                    ...seed,
                    images: seed.images,
                };
            }
        });
        if (merged.length !== props.length || JSON.stringify(merged) !== JSON.stringify(props)) {
            localStorage.setItem(K.PROPERTIES, JSON.stringify(merged));
        }
    }
    const defaultUsers = [
        { id: 'user-ADMIN-1', email: 'moadmin@gmail.com', full_name: 'ADMIN User', role: 'ADMIN', password: 'password123' },
        { id: 'user-SELLER-1', email: 'seller@example.com', full_name: 'Seller User', role: 'SELLER', password: 'password123' },
        { id: 'user-BUYER-1', email: 'buyer@example.com', full_name: 'Buyer User', role: 'BUYER', password: 'password123' },
    ];
    const currentUsers = JSON.parse(localStorage.getItem(K.USERS) || '[]');
    const requiredEmails = defaultUsers.map((u) => u.email);
    const hasAllDemoUsers = requiredEmails.every((email) => currentUsers.some((u) => u.email === email));
    if (!hasAllDemoUsers) {
        const userMap = new Map(defaultUsers.map((u) => [u.email, u]));
        const preservedUsers = currentUsers.filter((u) => !userMap.has(u.email));
        localStorage.setItem(K.USERS, JSON.stringify([...preservedUsers, ...defaultUsers]));
    }
    if (!localStorage.getItem(K.CONVERSATIONS)) {
        const convs = [
            { id: 'conv-2', property_id: 'prop-3', BUYER_id: 'user-BUYER-1', SELLER_id: 'user-SELLER-1', property_title: 'Spacious Family Home', other_user_name: 'John Smith', updated_at: new Date(Date.now() - 18000000).toISOString(), created_at: new Date(Date.now() - 172800000).toISOString() },
        ];
        localStorage.setItem(K.CONVERSATIONS, JSON.stringify(convs));
        const msgs = [
            { id: 'msg-4', conversation_id: 'conv-2', sender_id: 'user-BUYER-1', content: 'Hello, can you tell me more about the school district?', created_at: new Date(Date.now() - 172800000).toISOString() },
            { id: 'msg-5', conversation_id: 'conv-2', sender_id: 'user-SELLER-1', content: "It's in an excellent school district with top-rated schools nearby.", created_at: new Date(Date.now() - 18000000).toISOString() },
        ];
        localStorage.setItem(K.MESSAGES, JSON.stringify(msgs));
    }
    if (!localStorage.getItem(K.BOOKINGS)) {
        const bookings = [
            { id: 'booking-1', property_id: 'prop-2', property_title: 'Luxury Apartment in New Cairo', property_location: 'New Cairo, Cairo', property_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', BUYER_id: 'user-BUYER-1', date: '2026-05-18', time: '10:00 AM', notes: '', status: 'PENDING', created_at: new Date().toISOString() },
        ];
        localStorage.setItem(K.BOOKINGS, JSON.stringify(bookings));
    }
};
// ── AUTH ─────────────────────────────────
export const getCurrentUser = () => {
    const d = localStorage.getItem(K.CURRENT_USER);
    return d ? JSON.parse(d) : null;
};
export const setCurrentUser = (user) => {
    user ? localStorage.setItem(K.CURRENT_USER, JSON.stringify(user)) : localStorage.removeItem(K.CURRENT_USER);
};
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok)
            throw new Error('Login failed');
        const data = await response.json();
        // ✅ Save the JWT token for future authenticated requests
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }
        // Backend returns { name, role } — map to our User shape
        let userId = data.user?.id || data.id;
        // Normalize user IDs for demo accounts so chat/bookings/wishlist IDs stay consistent
        const mockUser = getUsers().find(u => u.email === (data.user?.email || email));
        if (mockUser) {
            userId = mockUser.id;
        }
        const user = {
            id: userId,
            email: data.user?.email || email,
            full_name: data.user?.name || data.user?.full_name || '',
            role: data.user?.role || data.role,
        };
        setCurrentUser(user);
        return user;
    }
    catch (error) {
        console.error('Login error:', error);
        // Fallback to mock with password validation
        const user = getUsers().find(u => u.email === email && u.password === password) || null;
        if (user)
            setCurrentUser(user);
        return user;
    }
};
export const register = async (email, fullName, role, password = 'Password123!') => {
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Backend expects: email, password, name, role (uppercase), phone
            body: JSON.stringify({ email, name: fullName, role: role.toUpperCase(), password })
        });
        if (!response.ok)
            throw new Error('Registration failed');
        const data = await response.json();
        // ✅ Save the JWT token
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }
        let userId = data.user?.id || data.id;
        // Normalize user IDs for demo accounts so chat/bookings/wishlist IDs stay consistent
        const mockUser = getUsers().find(u => u.email === (data.user?.email || email));
        if (mockUser) {
            userId = mockUser.id;
        }
        const user = {
            id: userId,
            email: data.user?.email || email,
            full_name: data.user?.name || fullName,
            role: data.user?.role || role,
        };
        setCurrentUser(user);
        return user;
    }
    catch (error) {
        console.error('Register error:', error);
        // Fallback to mock
        if (getUsers().find(u => u.email === email))
            throw new Error('Email already registered');
        const newUser = { id: `user-${Date.now()}`, email, full_name: fullName, role, password };
        const users = getUsers();
        users.push(newUser);
        localStorage.setItem(K.USERS, JSON.stringify(users));
        setCurrentUser(newUser);
        return newUser;
    }
};
export const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('access_token'); // ✅ Clear token on logout
};
// ── USERS ────────────────────────────────
export const getUsers = () => JSON.parse(localStorage.getItem(K.USERS) || '[]');
export const getUserById = (id) => getUsers().find(u => u.id === id) || null;
export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        if (!response.ok)
            throw new Error('Failed to delete user');
    }
    catch (error) {
        console.error('Delete user error:', error);
    }
    const users = getUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length)
        return false;
    localStorage.setItem(K.USERS, JSON.stringify(filtered));
    const current = getCurrentUser();
    if (current?.id === id)
        setCurrentUser(null);
    return true;
};
// ── PROPERTIES ───────────────────────────
export const getProperties = async () => {
    const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
    if (props.length < 5) {
        initializeSeedData();
        return JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
    }
    return props;
};
export const getPropertyById = async (id) => {
    const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
    if (props.length < 5) {
        initializeSeedData();
        const seeded = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
        return seeded.find((p) => p.id === id) || null;
    }
    return props.find((p) => p.id === id) || null;
};
export const increasePropertyViews = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/properties/${id}/views`, {
            method: 'POST',
            headers: authHeaders(),
        });
        if (!response.ok)
            throw new Error('Failed to increment views');
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || data.messages || [];
    }
    catch (error) {
        const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
        const index = props.findIndex((p) => p.id === id);
        if (index === -1)
            return null;
        props[index] = { ...props[index], views: (props[index].views || 0) + 1 };
        localStorage.setItem(K.PROPERTIES, JSON.stringify(props));
        return props[index];
    }
};
export const addProperty = async (p) => {
    console.log('➕ addProperty: Attempting API call...');
    try {
        const response = await fetch(`${API_BASE}/properties`, {
            method: 'POST',
            headers: authHeaders(), // ✅ sends token
            body: JSON.stringify(p)
        });
        console.log('✅ Add property API call successful:', response.status);
        if (!response.ok)
            throw new Error('Failed to add property');
        const data = await response.json();
        console.log('📦 API returned new property:', data.id);
        return data;
    }
    catch (error) {
        console.warn('⚠️ Add property API failed, using mock storage:', error.message);
        const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
        const np = {
            ...p,
            id: `prop-${Date.now()}`,
            created_at: new Date().toISOString(),
            views: p.views ?? 0,
        };
        props.push(np);
        localStorage.setItem(K.PROPERTIES, JSON.stringify(props));
        console.log('💾 Mock property saved:', np.id);
        return np;
    }
};
export const updateProperty = async (id, updates) => {
    try {
        // ✅ Use correct ADMIN status endpoint from API guide
        const isStatusUpdate = Object.keys(updates).length === 1 && updates.status;
        const url = isStatusUpdate
            ? `${API_BASE}/properties/${id}/status`
            : `${API_BASE}/properties/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: authHeaders(), // ✅ sends token
            body: JSON.stringify(updates)
        });
        if (!response.ok)
            throw new Error('Failed to update property');
        return await response.json();
    }
    catch (error) {
        console.error('Update property error:', error);
        const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
        const i = props.findIndex((p) => p.id === id);
        if (i === -1)
            return null;
        props[i] = { ...props[i], ...updates };
        localStorage.setItem(K.PROPERTIES, JSON.stringify(props));
        return props[i];
    }
};
export const deleteProperty = async (id) => {
    let apiSuccess = false;
    try {
        const response = await fetch(`${API_BASE}/properties/${id}`, {
            method: 'DELETE',
            headers: authHeaders(), // ✅ sends token
        });
        apiSuccess = response.ok;
        if (!apiSuccess)
            throw new Error('Failed to delete property');
    }
    catch (error) {
        console.error('Delete property error:', error);
    }
    const props = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
    const f = props.filter((p) => p.id !== id);
    if (f.length === props.length)
        return apiSuccess;
    localStorage.setItem(K.PROPERTIES, JSON.stringify(f));
    return true;
};
// ── BOOKINGS ─────────────────────────────
export const getBookings = async (userId) => {
    // Always read from localStorage for reliability
    const data = JSON.parse(localStorage.getItem(K.BOOKINGS) || '[]');
    const filtered = data.filter((b) => b.status?.toUpperCase() !== 'CANCELLED');
    return userId ? filtered.filter(b => b.BUYER_id === userId) : filtered;
};
export const addBooking = async (b) => {
    // Always save locally first for reliable data
    const bookings = JSON.parse(localStorage.getItem(K.BOOKINGS) || '[]');
    const nb = { ...b, id: `booking-${Date.now()}`, created_at: new Date().toISOString() };
    bookings.push(nb);
    localStorage.setItem(K.BOOKINGS, JSON.stringify(bookings));
    
    // Also try API if available
    try {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(b)
        });
        if (response.ok)
            return await response.json();
    }
    catch (error) {
        console.error('Add booking API error (ignored):', error);
    }
    return nb;
};
export const cancelBooking = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/bookings/${id}/status`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({ status: 'CANCELLED' })
        });
        if (!response.ok)
            throw new Error('Failed to cancel booking');
        return true;
    }
    catch (error) {
        console.error('Cancel booking error:', error);
        const bookings = JSON.parse(localStorage.getItem(K.BOOKINGS) || '[]');
        const filtered = bookings.filter((b) => b.id !== id);
        if (filtered.length === bookings.length)
            return false;
        localStorage.setItem(K.BOOKINGS, JSON.stringify(filtered));
        return true;
    }
};
export const updateBookingStatus = async (id, status) => {
    const bookings = JSON.parse(localStorage.getItem(K.BOOKINGS) || '[]');
    const idx = bookings.findIndex(b => b.id === id);
    if (idx === -1) return false;
    bookings[idx].status = status;
    localStorage.setItem(K.BOOKINGS, JSON.stringify(bookings));
    return true;
};
// ── WISHLIST ─────────────────────────────
export const getWishlist = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/wishlists`, {
            headers: authHeaders(), // ✅ sends token (backend uses token to identify user)
        });
        if (!response.ok)
            throw new Error('Failed to fetch wishlist');
        const data = await response.json();
        // API returns array of wishlist items with property inside
        const serverIds = data.map((item) => item.property?.id || item.propertyId || item.id).filter(Boolean);
        const local = JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
        return Array.from(new Set([...(local || []), ...serverIds]));
    }
    catch (error) {
        console.error('Get wishlist error:', error);
        return JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
    }
};
export const addToWishlist = async (userId, propertyId) => {
    try {
        const response = await fetch(`${API_BASE}/wishlists/${propertyId}`, {
            method: 'POST',
            headers: authHeaders(),
        });
        if (!response.ok)
            throw new Error('Failed to add to wishlist');
    }
    catch (error) {
        console.error('Add to wishlist error:', error);
        const wl = JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
        if (!wl.includes(propertyId)) {
            wl.push(propertyId);
            localStorage.setItem(`brickly_wishlist_${userId}`, JSON.stringify(wl));
        }
    }
    // Mirror to localStorage so demo mode persists without a backend
    try {
        const wl = JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
        if (!wl.includes(propertyId)) {
            wl.push(propertyId);
            localStorage.setItem(`brickly_wishlist_${userId}`, JSON.stringify(wl));
        }
    }
    catch (e) {
        console.error('Failed to mirror wishlist locally:', e);
    }
};
export const removeFromWishlist = async (userId, propertyId) => {
    try {
        const response = await fetch(`${API_BASE}/wishlists/${propertyId}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        if (!response.ok)
            throw new Error('Failed to remove from wishlist');
    }
    catch (error) {
        console.error('Remove from wishlist error:', error);
        const wl = JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
        localStorage.setItem(`brickly_wishlist_${userId}`, JSON.stringify(wl.filter((id) => id !== propertyId)));
    }
    // Mirror removal to localStorage for demo persistence
    try {
        const wl = JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
        const filtered = wl.filter((id) => id !== propertyId);
        localStorage.setItem(`brickly_wishlist_${userId}`, JSON.stringify(filtered));
    }
    catch (e) {
        console.error('Failed to mirror wishlist removal locally:', e);
    }
};
export const isInWishlist = async (userId, propertyId) => {
    try {
        const wishlist = await getWishlist(userId);
        return wishlist.includes(propertyId);
    }
    catch (error) {
        console.error('Check wishlist error:', error);
        const wl = JSON.parse(localStorage.getItem(`brickly_wishlist_${userId}`) || '[]');
        return wl.includes(propertyId);
    }
};
// ── CONVERSATIONS / CHATS ─────────────────
const normalizeConversation = (conversation, currentUserId) => {
    const users = getUsers();
    const properties = JSON.parse(localStorage.getItem(K.PROPERTIES) || '[]');
    const buyerId = conversation.BUYER_id || conversation.buyer_id || conversation.buyerId || conversation.buyer?.id;
    const sellerId = conversation.SELLER_id || conversation.seller_id || conversation.sellerId || conversation.seller?.id;
    const propertyId = conversation.property_id || conversation.propertyId || conversation.property?.id;
    const property = properties.find((p) => p.id === propertyId) || conversation.property || {};
    const otherUserId = currentUserId === sellerId ? buyerId : sellerId;
    const otherUser =
        users.find((u) => u.id === otherUserId) ||
        (currentUserId === sellerId ? conversation.buyer : conversation.seller) ||
        conversation.other_user ||
        {};
    const fallbackName = currentUserId === sellerId ? 'Buyer' : 'Property Owner';

    return {
        ...conversation,
        id: conversation.id || conversation._id,
        property_id: propertyId,
        BUYER_id: buyerId,
        SELLER_id: sellerId,
        property_title: conversation.property_title || conversation.propertyTitle || property.title || 'Property conversation',
        other_user_name:
            otherUser.full_name ||
            otherUser.fullName ||
            otherUser.name ||
            conversation.other_user_name ||
            conversation.otherUserName ||
            fallbackName,
        updated_at: conversation.updated_at || conversation.updatedAt || conversation.created_at || conversation.createdAt || new Date().toISOString(),
        created_at: conversation.created_at || conversation.createdAt || new Date().toISOString(),
    };
};

const normalizeMessage = (message, conversationId) => ({
    ...message,
    id: message.id || message._id || `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    conversation_id: message.conversation_id || message.conversationId || conversationId,
    sender_id: message.sender_id || message.senderId || message.sender?.id,
    content: message.content || message.message || message.text || '',
    created_at: message.created_at || message.createdAt || new Date().toISOString(),
});

export const getConversations = async (userId) => {
    // Always read from localStorage for reliability
    const data = JSON.parse(localStorage.getItem(K.CONVERSATIONS) || '[]');
    if (!userId)
        return data.map((conversation) => normalizeConversation(conversation, userId));
    // Check if user is ADMIN - admins can see all conversations
    const currentUser = getCurrentUser();
    const isAdmin = currentUser?.role === 'ADMIN';
    return data
        .map((conversation) => normalizeConversation(conversation, userId))
        .filter(c => isAdmin || c.BUYER_id === userId || c.SELLER_id === userId)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
};
export const addConversation = async (c) => {
    // Always save locally first for reliable data
    const convs = JSON.parse(localStorage.getItem(K.CONVERSATIONS) || '[]');
    const existing = convs.find(conv => conv.property_id === c.property_id && (conv.BUYER_id === c.BUYER_id || conv.SELLER_id === c.SELLER_id));
    if (existing) return existing;
    const nc = { ...c, id: `conv-${Date.now()}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    convs.push(nc);
    localStorage.setItem(K.CONVERSATIONS, JSON.stringify(convs));
    
    // Also try API if available
    try {
        const response = await fetch(`${API_BASE}/chats`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ SELLERId: c.SELLER_id, propertyId: c.property_id })
        });
        if (response.ok)
            return await response.json();
    }
    catch (error) {
        console.error('Add conversation API error (ignored):', error);
    }
    return nc;
};
export const getMessagesByConversation = async (conversationId) => {
    // Always read from localStorage for reliability
    const data = JSON.parse(localStorage.getItem(K.MESSAGES) || '[]');
    return data
        .filter(m => String(m.conversation_id || m.conversationId) === String(conversationId))
        .map((message) => normalizeMessage(message, conversationId));
};
export const addMessage = async (m) => {
    try {
        // Messages are sent via WebSocket (sendMessage event), not REST API
        // This fallback uses mock storage
        throw new Error('Use WebSocket for sending messages');
    }
    catch (error) {
        console.error('Add message error:', error);
        const msgs = JSON.parse(localStorage.getItem(K.MESSAGES) || '[]');
        const nm = normalizeMessage({ ...m, id: `msg-${Date.now()}`, created_at: new Date().toISOString() }, m.conversation_id || m.conversationId);
        msgs.push(nm);
        localStorage.setItem(K.MESSAGES, JSON.stringify(msgs));
        const convs = JSON.parse(localStorage.getItem(K.CONVERSATIONS) || '[]');
        const i = convs.findIndex((c) => String(c.id || c._id) === String(m.conversation_id || m.conversationId));
        if (i !== -1) {
            convs[i].updated_at = new Date().toISOString();
            localStorage.setItem(K.CONVERSATIONS, JSON.stringify(convs));
        }
        return nm;
    }
};
initializeSeedData();
