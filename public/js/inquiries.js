let selectedFarmer = null;
let selectedTab = 'inquiries';
let currentUser = null;

// Fetch current user from session
async function getCurrentUser() {
  try {
    const res = await fetch('/api/auth/me');
    if (res.status !== 200) throw new Error("Not logged in");
    currentUser = await res.json();
  } catch (err) {
    alert("You must be logged in.");
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await getCurrentUser();
  setupTabs();
  loadFarmers();
});

function setupTabs() {
  const inquiriesTab = document.getElementById('tab-inquiries');
  const dmsTab = document.getElementById('tab-dms');

  inquiriesTab.addEventListener('click', () => {
    selectedTab = 'inquiries';
    switchTabUI(inquiriesTab);
    loadFarmers();
  });

  dmsTab.addEventListener('click', () => {
    selectedTab = 'dms';
    switchTabUI(dmsTab);
    loadFarmers();
  });
}

function switchTabUI(activeButton) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

async function loadFarmers() {
  const farmerList = document.getElementById('farmerList');
  farmerList.innerHTML = '';

  const endpointToCall = selectedTab === 'dms' ? '/api/inquiries/my-farmers' : '/api/inquiries/my';

  try {
    const res = await fetch(endpointToCall);
    const data = await res.json();

    if (selectedTab === 'dms') {
      data.forEach(contact => {
        const div = document.createElement('div');
        div.classList.add('farmer-cona');
        div.textContent = contact.fullName;
        div.onclick = () => selectChatWithFarmer(contact, div);
        farmerList.appendChild(div);
      });
    } else {
      data.forEach(inq => {
        const div = document.createElement('div');
        div.classList.add('farmer-container');

        const statusColor =
          inq.status === 'pending' ? 'orange' :
          inq.status === 'accepted' ? 'green' :
          ['rejected', 'cancelled'].includes(inq.status) ? 'red' : 'gray';

        const nameToShow = currentUser.type === 'farmer' ? inq.user.fullName : inq.farmer.fullName;

        div.innerHTML = `
          <strong>${inq.product.title}</strong><br/>
          Me: <strong>${nameToShow}</strong><br/>
          Quantity: <strong>${inq.quantity}</strong><br/>
          Price: LEK<strong>${inq.totalPrice}</strong><br/>
          <div style="color: ${statusColor};">Status: <strong>${inq.status}</strong></div>
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action-buttons');
        buttonContainer.style.marginTop = '5px';

        const isPending = inq.status === 'pending';
        const isCompleted = ['accepted', 'completed'].includes(inq.status);

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
  } catch (err) {
    console.error("Error loading farmers:", err);
    alert("Failed to load farmers.");
  }
}

function selectFarmer(farmer, element) {
  selectedFarmer = farmer;
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
      loadFarmers();
    } else {
      const err = await res.json();
      alert('Error: ' + err.message);
    }
  } catch (err) {
    console.error(err);
    alert('Server error while processing action');
  }
}

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
  document.querySelectorAll('.farmer').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');

  if (!currentUser) {
    const userRes = await fetch('/api/auth/me');
    currentUser = await userRes.json();
  }

  const res = await fetch('/api/inquiries/my');
  const inquiries = await res.json();

  const foundInquiry = inquiries.find(inq =>
    currentUser.type === 'farmer' ? inq.user._id === contact._id : inq.farmer._id === contact._id
  );

  if (!foundInquiry) {
    alert("No chat history found with this user.");
    return;
  }

  fetchMessages(foundInquiry._id);

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
      loadFarmers();
    } else {
      alert(data.message || 'Failed to submit review.');
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting review.");
  }
}