let selectedFarmer = null;
let selectedTab = 'inquiries';
let currentUser = null;

// Fetch current user from session
async function getCurrentUser() {
  const res = await fetch('/api/auth/me');
  if (res.status !== 200) {
    alert("You must be logged in."); return;
  }
  currentUser = await res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  await getCurrentUser();
  setupTabs();
  loadFarmers();
});

// Handle tab switching
function setupTabs() {
  const inquiriesTab = document.getElementById('tab-inquiries');
  const dmsTab = document.getElementById('tab-dms');

  inquiriesTab.addEventListener('click', () => {
    selectedTab = 'inquiries';
    switchTabUI(inquiriesTab);
    loadFarmers(); // Load all farmers (or only inquiry-based in future)
  });

  dmsTab.addEventListener('click', () => {
    selectedTab = 'dms';
    switchTabUI(dmsTab);
    loadFarmers(); // You may filter on backend for DMs exclusively
  });
}

// Highlight selected tab
function switchTabUI(activeButton) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

// Load farmers
async function loadFarmers() {
    const farmerList = document.getElementById('farmerList');
    farmerList.innerHTML = '';

    let endpointToCall = selectedTab === 'dms' ? '/api/inquiries/my-farmers' : '/api/inquiries/my';
  
    const res = await fetch(endpointToCall);
    const data = await res.json();
  
    if (selectedTab === 'dms') {
      // Farmers list for chat
      data.forEach(contact => {
        const div = document.createElement('div');
        div.classList.add('farmer');
        div.textContent = contact.fullName; // already populated fully

        div.onclick = () => selectChatWithFarmer(contact, div);
        farmerList.appendChild(div);
    });
    } else {
      // Inquiry list for status tab
      data.forEach(inq => {
        const div = document.createElement('div');
        div.classList.add('farmer');

        const statusColor =
        inq.status === 'pending' ? 'orange' :
        inq.status === 'accepted' ? 'green' :
        inq.status === 'rejected' || inq.status === 'cancelled' ? 'red' : 'gray';

        const nameToShow =
          currentUser.type === 'farmer'
            ? inq.user.fullName
            : inq.farmer.fullName;

        div.innerHTML = `
            <strong>${inq.product.title}</strong><br/>
            Me: <strong>${nameToShow}</strong><br/>
            Quantity: <strong>${inq.quantity}</strong><br/>
            Price: LEK<strong>${inq.totalPrice}</strong><br/>
            <div style="color: ${statusColor};">Status: <strong>${inq.status}</strong></div>
          `;

        const isPending = inq.status === 'pending';
        const isCompleted = ['accepted', 'completed'].includes(inq.status);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action-buttons');
        buttonContainer.style.marginTop = '5px';


        if (currentUser.type === 'farmer' && isPending) {
            buttonContainer.innerHTML += `
              <button onclick="handleInquiryAction('${inq._id}', 'accepted')">✅</button>
              <button onclick="handleInquiryAction('${inq._id}', 'rejected')">❌</button>
            `;
          }
      
          if (currentUser.type === 'user' && isPending) {
            buttonContainer.innerHTML += `
              <button onclick="handleInquiryAction('${inq._id}', 'cancelled')">❌ Cancel</button>
            `;
          }
      
          if (currentUser.type === 'user' && isCompleted && !inq.isReviewed) {
            buttonContainer.innerHTML += `
              <label for="rate-${inq._id}">⭐ Rate:</label>
              <select id="rate-${inq._id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option selected value="5">5</option>
              </select>
              <button onclick="submitReview('${inq._id}')">Submit Review</button>
            `;
          }

        
        div.appendChild(buttonContainer);
        farmerList.appendChild(div);
    });
    }
  }  

// Select a farmer (highlight + fetch chat)
function selectFarmer(farmer, element) {
  selectedFarmer = farmer;

  // Highlight selected farmer
  document.querySelectorAll('.farmer').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');

  fetchMessages(farmer.id);
  document.getElementById('sendMessage').onclick = () => sendInquiryAndMessage();
}

async function handleInquiryAction(inquiryId, newStatus) {
    try {
      const res = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (res.ok) {
        alert(`Inquiry ${newStatus}`);
        loadFarmers(); // Refresh inquiry list
      } else {
        const err = await res.json();
        alert('Error: ' + err.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error while processing action');
    }
  }
  

// Send inquiry & auto-generated message
async function sendInquiryAndMessage() {
  const messageBox = document.getElementById('messageText');
  const messageText = messageBox.value.trim();

  if (!messageText || !selectedFarmer || !currentUser) return;

  try {
    const inquiryRes = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: currentUser._id,
        farmer: selectedFarmer.id,
        product: selectedFarmer.productId,
        quantity: 1,
        totalPrice: 10
      })
    });

    const inquiry = await inquiryRes.json();
    messageBox.value = '';
    await fetchMessages(inquiry._id);
  } catch (e) {
    alert("Failed to send inquiry or message.");
    console.error(e);
  }
}

// Load messages (for a chat/inquiry)
async function fetchMessages(chatId) {
  try {
    const res = await fetch(`/api/messages/${chatId}`);
    const data = await res.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    data.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'message ' + (msg.sender === currentUser._id ? 'you' : 'them');
      msgDiv.textContent = msg.text;
      messagesDiv.appendChild(msgDiv);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (e) {
    console.error("Failed to load messages", e);
  }
}

async function selectChatWithFarmer(contact, element) {
    selectedFarmer = contact;
  
    // UI highlight
    document.querySelectorAll('.farmer').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
  
    // Get current user (if not stored already)
    if (!currentUser) {
      const userRes = await fetch('/api/auth/me');
      currentUser = await userRes.json();
    }
  
    // Get all inquiries relevant to current user (user or farmer)
    const res = await fetch('/api/inquiries/my');
    const inquiries = await res.json();
  
    let foundInquiry;
  
    // Determine user role and find matching inquiry
    if (currentUser.type === 'farmer') {
      // Find inquiry where current farmer = recipient, contact = user
      foundInquiry = inquiries.find(
        inq => inq.user._id === contact._id
      );
    } else {
      // user is logged in → find farmer
      foundInquiry = inquiries.find(
        inq => inq.farmer._id === contact._id
      );
    }
  
    if (!foundInquiry) {
      alert("No chat history found with this user.");
      return;
    }
  
    // Load messages for this chat
    fetchMessages(foundInquiry._id);
  
    // Assign send message event
    document.getElementById('sendMessage').onclick = () => {
      sendMessage(foundInquiry._id, contact._id);
    };
  }
  
  
  async function sendMessage(chatId, recipientId) {
    const messageBox = document.getElementById('messageText');
    const messageText = messageBox.value.trim();
  
    if (!messageText || !currentUser) return;
  
    try {
      const res = await fetch(`/api/messages`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          sender: currentUser._id,
          recipient: recipientId,
          text: messageText
        })
      });
  
      if (res.ok) {
        messageBox.value = '';
        fetchMessages(chatId);
      } else {
        alert("Could not send message");
      }
    } catch (error) {
      console.error("Send message error:", error);
      alert("Message send failed.");
    }
  }
  
  async function submitReview(orderId) {
    const rating = document.getElementById(`rate-${orderId}`).value;
  
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, rating: Number(rating) })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(data.message || 'Review submitted!');
        loadFarmers(); // refresh UI
      } else {
        alert(data.message || 'Failed to submit review.');
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    }
  }
  