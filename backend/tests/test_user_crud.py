

def test_user_read(test_app):
    response = test_app.get("/users/me")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}