"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Edit2,
  Plus,
  Trash2,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuthStore, useWishlistStore } from "@/lib/store"

const mockOrders = [
  {
    id: "FRT-2024-001",
    date: "Nov 20, 2024",
    status: "Delivered",
    total: 1899,
    items: [
      { name: "Premium Almonds", quantity: 2, image: "/pile-of-almonds.png" },
      { name: "Kashmiri Saffron", quantity: 1, image: "/saffron.jpg" },
    ],
  },
  {
    id: "FRT-2024-002",
    date: "Nov 15, 2024",
    status: "In Transit",
    total: 2499,
    items: [
      { name: "Premium Cashews", quantity: 1, image: "/cashews.jpg" },
      { name: "Organic Walnuts", quantity: 2, image: "/walnuts-pile.png" },
    ],
  },
]

const mockAddresses = [
  {
    id: "1",
    type: "Home",
    name: "Demo User",
    address: "123 Green Valley Road, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400058",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: "2",
    type: "Office",
    name: "Demo User",
    address: "456 Business Park, Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    phone: "+91 98765 43210",
    isDefault: false,
  },
]

export function ProfileContent() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { items: wishlistItems } = useWishlistStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Demo User",
    email: user?.email || "demo@fruittura.com",
    phone: user?.phone || "+91 98765 43210",
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: true,
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Please Sign In</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your profile.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlistItems.length },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">My Account</h1>
          <p className="text-muted-foreground mt-1">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* User info */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-primary">{profileData.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{profileData.name}</h3>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <nav className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.count !== undefined && item.count > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                ))}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors mt-2"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{profileData.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{profileData.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">My Orders</h2>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {order.status}
                            </span>
                            <p className="font-semibold mt-1">Rs. {order.total.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="h-12 w-12 rounded-lg border-2 border-card overflow-hidden">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">
                              {order.items.map((item) => item.name).join(", ")}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">My Wishlist</h2>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                      <Link href="/shop">
                        <Button>Browse Products</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border border-border rounded-lg p-4">
                          <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <p className="text-primary font-semibold">Rs. {item.price.toLocaleString()}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mockAddresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 relative ${
                          address.isDefault ? "border-primary" : "border-border"
                        }`}
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-muted px-2 py-0.5 rounded text-sm font-medium">{address.type}</span>
                        </div>
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.address}
                          <br />
                          {address.city}, {address.state} - {address.pincode}
                          <br />
                          {address.phone}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === "payments" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Card
                    </Button>
                  </div>
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">No saved payment methods</p>
                    <p className="text-sm text-muted-foreground">Add a card for faster checkout</p>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: "orderUpdates",
                        title: "Order Updates",
                        description: "Get notified about order status changes",
                      },
                      {
                        key: "promotions",
                        title: "Promotions & Offers",
                        description: "Receive exclusive deals and discounts",
                      },
                      {
                        key: "newArrivals",
                        title: "New Arrivals",
                        description: "Be the first to know about new products",
                      },
                      {
                        key: "priceDrops",
                        title: "Price Drops",
                        description: "Get alerts when wishlist items go on sale",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between py-4 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
